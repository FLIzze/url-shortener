<script lang="ts">
	import { fade } from 'svelte/transition';

	interface PropsType {
		alertMessage: string;
		display: boolean;
		error: boolean;
	}

	let { alertMessage, display, error }: PropsType = $props();
</script>

{#if display}
	<div class="clipboard-alert" class:error transition:fade>
		{#if !error}
			<p>Copied to clipboard !</p>
		{/if}
		<p>{alertMessage}</p>
	</div>
{/if}

<style>
	.clipboard-alert {
		position: absolute;
		background-color: white;
		top: 0;
		right: 0;
		margin-top: 10px;
		margin-right: 10px;
		padding: 10px;
		border-radius: 2%;
		z-index: 99;
		color: black;
	}
	.clipboard-alert.error {
		background-color: red;
		color: white;
	}
</style>
