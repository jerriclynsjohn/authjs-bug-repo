<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	function getOut() {
		signOut();
	}
</script>

<div class="flex items-center justify-between px-6">
	<p>AuthJS</p>
	<button on:click={getOut}>Logout</button>
</div>

<slot />
