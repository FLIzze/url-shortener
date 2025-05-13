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
				throw new Error(`Error getting on ${url} : ${response.status}`);
			}

			const data = await response.json();
                        window.location.replace(data.original_url);
		} catch (err) {
			console.error(err);
		}
	});
</script>
