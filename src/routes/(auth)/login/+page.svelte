<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	let email = '';

	async function loginSubmit() {
		console.log(email);
		const signInResult = await signIn('email', {
			email: email,
			redirect: false,
			callbackUrl: '/dashboard'
		});

		if (!signInResult?.ok) {
			console.log(signInResult);
		}
	}
</script>

<form on:submit={loginSubmit} class="mt-10 flex w-[328px] flex-col gap-6">
	<div class="flex flex-col gap-1">
		<label for="email">Email address</label>
		<input
			id="email"
			name="email"
			type="email"
			bind:value={email}
			class="h-[34px] rounded-md border"
		/>
	</div>
	<button
		type="submit"
		class="bg-slate-900 mt-2 flex flex-col items-center rounded-md py-2 text-sm leading-4 text-slate-50"
	>
		Sign in
	</button>
</form>
