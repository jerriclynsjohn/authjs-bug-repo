<script lang="ts">
	import ButtonPrimary from '$lib/emails/components/ButtonPrimary.svelte';
	import Divider from '$lib/emails/components/Divider.svelte';
	import Footer from '$lib/emails/components/Footer.svelte';
	import Head from '$lib/emails/components/Head.svelte';
	import Header from '$lib/emails/components/Header.svelte';
	import { purple } from '$lib/emails/components/theme';

	export let url: string;
</script>

<mjml>
	<Head />
	<mj-body width="500px">
		<mj-wrapper full-width="full-width" css-class="container">
			<Header title="Your Login Link" />
			<mj-section css-class="smooth">
				<mj-column>
					<mj-text css-class="paragraph">Welcome to Auth Test</mj-text>
					<mj-text css-class="paragraph">
						Please click the magic link below to sign in to your account.
					</mj-text>
					<ButtonPrimary link={url} uiText="Sign In" />
					<mj-text css-class="paragraph">
						If you're on a mobile device, you can also copy the link below and paste it into the
						browser of your choice.
					</mj-text>
					<mj-text css-class="paragraph">
						<a
							rel="nofollow"
							href={url}
							style={`textDecoration: 'none',color: ${purple} !important`}
						>
							{url.replace(/^https?:\/\//, '')}
						</a>
					</mj-text>
					<mj-text css-class="paragraph">
						This link expires in 24 hours and can only be used once.
					</mj-text>
					<mj-text css-class="paragraph">
						If you did not request this email, you can safely ignore it.
					</mj-text>
					<Divider />
				</mj-column>
			</mj-section>
			<Footer />
		</mj-wrapper>
	</mj-body>
</mjml>
