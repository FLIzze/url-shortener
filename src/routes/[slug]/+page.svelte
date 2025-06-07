<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const url = page.url.pathname;

	onMount(async () => {
		try {
			const response = await fetch(`${url}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				console.error(`No mapping for url : ${url}`);
			}

			const data = await response.json();

			if (data.status === 200) {
				window.location.replace(data.original_url);
			}
		} catch (err) {
			console.error(err);
		}
	});
</script>

<div class="container">
	<p>This link does not exist</p>
	<p>You can create one <a href="http://localhost:5173">here</a></p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
		align-items: center;
		gap: 10px;
	}
	p {
		margin: 0;
		padding: 0;
	}
</style>
