<script lang="ts">
	import Alerte from './Alerte.svelte';

	interface UrlShortenResponse {
		status: number;
		message: string;
		url?: string;
	}

	let url = '';
	let alertMessage = '';
	let display = false;
	let severity: 'Success' | 'Error';

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
		display = true;
		severity = 'Success';

		setTimeout(() => {
			display = false;
		}, 3500);

		if (data.status !== 200) {
			alertMessage = data.message;
			severity = 'Error';
			return;
		}

		const domainName = window.location.hostname;
		const port = window.location.port;

		navigator.clipboard.writeText(`http://${domainName}:${port}/${data.url}`);
		alertMessage = 'Copied to clipboard !';
	}
</script>

<div class="container">
	<form onsubmit={handleSubmit} class="form">
		<input type="text" bind:value={url} placeholder="url" class="input" />
		<button type="submit" class="button">Shorten</button>
	</form>

	<Alerte {alertMessage} {display} {severity} />
</div>

<style>
	@font-face {
		font-family: 'roboto';
		src: url('/fonts/Roboto-Medium.ttf');
	}

	:global(*) {
		margin: 0;
		padding: 0;
		font-family: roboto;
	}

	.container {
		height: 100vh;
		width: 100wh;
		justify-content: center;
		align-items: center;
		display: flex;
		background-color: white;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.button {
		background-color: white;
		border: solid;
		border-width: 2px;
		border-radius: 4px;
		height: 30px;
		transition: all 0.5s;
		cursor: pointer;
	}
	.button:hover {
		background-color: black;
		color: white;
		border-color: black;
	}
	.input {
		transition: all 0.5s;
		background-color: white;
		border: none;
		border-bottom: solid;
		border-width: 2px;
		height: 30px;
		text-align: center;
	}
	.input:focus {
		outline: none;
		border-color: red;
	}
	.input:focus::placeholder {
		color: transparent;
	}
</style>
