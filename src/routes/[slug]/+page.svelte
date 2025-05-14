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

<a>404</a>
