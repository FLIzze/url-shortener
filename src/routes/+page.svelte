<script lang="ts">
	let url = '';
	let shortened_url = '';
        let nbr_use;
        let date;

	async function handleSubmit() {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ url, date, nbr_use }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Error posting on / : ${response.status}`);
		}

		const data = await response.json();
		shortened_url = data.url;
	}
</script>

<form on:submit={handleSubmit}>
	<input type="text" bind:value={url} placeholder="url to shorten" />
        <input type="date" bind:value={date}>
        <input type="number" bind:value={nbr_use}>
	<button type="submit">Submit</button>
</form>

{#if shortened_url !== "" && shortened_url !== undefined}
	<p>localhost:5173/{shortened_url}</p>
{/if}
