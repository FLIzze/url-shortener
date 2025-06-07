<script lang="ts">
	import { fade } from 'svelte/transition';
	import Error from '$lib/assets/error.png';
	import Success from '$lib/assets/success.png';

	interface PropsType {
		alertMessage: string;
		display: boolean;
		severity: 'Success' | 'Error';
	}

	let { alertMessage, display, severity }: PropsType = $props();
</script>

{#if display}
	<div
		class="clipboard-alert"
		class:error={severity === 'Error'}
		class:success={severity === 'Success'}
		transition:fade
	>
		<img src={severity === 'Error' ? Error : Success} alt={severity} height="20px" />
		<p>{alertMessage}</p>
	</div>
{/if}

<style>
	.clipboard-alert {
		position: absolute;
		background-color: white;
		color: black;
		height: fit-content;
		width: fit-content;
		top: 0;
		right: 0;
		margin-top: 10px;
		margin-right: 10px;
		padding: 10px;
		gap: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 2px solid;
		border-radius: 4px;
	}

	.clipboard-alert.error {
		color: #ef5050;
	}

	.clipboard-alert.success {
		color: #31c462;
	}
</style>
