import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import Email from '@auth/core/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { redirect, type Handle } from '@sveltejs/kit';
import postmark from 'postmark';

import { db } from '$lib/server/db';
import { render } from '$lib/emails';
import LoginLinkEmail from '$lib/emails/LoginLinkEmail.svelte';
import AccountActivationEmail from '$lib/emails/AccountActivationEmail.svelte';

import { POSTMARK_API_TOKEN, EMAIL_FROM } from '$env/static/private';

const postmarkClient = new postmark.ServerClient(POSTMARK_API_TOKEN);

const protectedPaths = ['/dashboard'];

const protect = (async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	if (!protectedPaths.includes(event.url.pathname)) {
		return resolve(event);
	}

	if (!session?.user) {
		// Redirect to login page
		throw redirect(303, '/');
	}

	// else if (session?.user && !session?.user.onboardingComplete) {
	//   throw redirect(303, '/onboarding/company');
	// } else if (session?.user && session?.user.onboardingComplete) {
	//   throw redirect(303, '/dashboard');
	// }

	return resolve(event);
}) satisfies Handle;

const authenticate = SvelteKitAuth({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	adapter: PrismaAdapter(db),
	providers: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Email({
			normalizeIdentifier(identifier: string): string {
				if (identifier.split('@').length > 2) {
					throw new Error('Only one email allowed');
				}
				// Get the first two elements only,
				// separated by `@` from user input.
				// eslint-disable-next-line prefer-const
				let [local, domain] = identifier.toLowerCase().trim().split('@');
				// The part before "@" can contain a ","
				// but we remove it on the domain part
				domain = domain.split(',')[0];
				return `${local}@${domain}`;
			},
			from: EMAIL_FROM,
			sendVerificationRequest: async ({ identifier, url, provider }) => {
				const user = await db.user.findUnique({
					where: {
						email: identifier
					},
					select: {
						emailVerified: true
					}
				});
				const emailSubject = user?.emailVerified
					? 'Sign-in link for Auth Test'
					: 'Activate your account';
				const signInEmailHtml = render({
					template: LoginLinkEmail,
					props: {
						url
					}
				});
				const activationEmailHtml = render({
					template: AccountActivationEmail,
					props: {
						url
					}
				});
				const emailBodyHtml = user?.emailVerified ? signInEmailHtml : activationEmailHtml;

				const result = await postmarkClient.sendEmail({
					From: provider.from as string,
					To: identifier,
					Subject: emailSubject,
					HtmlBody: emailBodyHtml,
					Headers: [
						{
							// Set this to prevent Gmail from threading emails.
							// See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
							Name: 'X-Entity-Ref-ID',
							Value: new Date().getTime() + ''
						}
					]
				});

				if (result.ErrorCode) {
					throw new Error(result.Message);
				}
			}
		})
	]
});

export const handle = sequence(authenticate, protect);
