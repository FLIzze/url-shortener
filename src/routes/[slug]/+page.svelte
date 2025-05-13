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
                                // shit way of doing it, will change
                                window.location.replace("localhost:5173/");
			}

			const data = await response.json();
                        window.location.replace(data.original_url);
		} catch (err) {
			console.error(err);
		}
	});
</script>
