<script lang="ts">
	import Alerte from './Alerte.svelte';

	interface UrlShortenResponse {
		status: number;
		message: string;
		url?: string;
	}

	let url = $state('');
	let alertMessage = $state('');
	let display = $state(false);
	let error = $state(false);

	async function handleSubmit() {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ url }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Error posting on / : ${response.status}`);
		}

		const data: UrlShortenResponse = await response.json();

		url = '';
		error = false;
		display = true;

		setTimeout(() => {
			display = false;
		}, 3500);

		if (data.status !== 200) {
			alertMessage = data.message;
			error = true;
			return;
		}

		alertMessage = `http://localhost:5173/${data.url}`;
		navigator.clipboard.writeText(alertMessage);
	}
</script>

<div class="container">
	<form onsubmit={handleSubmit} class="form">
		<input type="text" bind:value={url} placeholder="Url" />
		<button type="submit">Shorten</button>
	</form>

	<Alerte {alertMessage} {display} {error} />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}

	.container {
		height: 100vh;
		width: 100wh;
		justify-content: center;
		align-items: center;
		display: flex;
		background-color: black;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
