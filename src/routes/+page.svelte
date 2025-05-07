<script lang="ts">
        let url = "";

        async function handleSubmit() {
                const response = await fetch("/", {
                        method: "POST",
                        body: JSON.stringify({ url }),
                        headers: {
                                "Content-Type": "application/jscon"
                        }
                });

                if (!response.ok) {
                        throw new Error(`Error posting on / ${response.status}`);
                }
        }
</script>

<form on:submit={handleSubmit}>
	<input type="text" bind:value={url} placeholder="url to shorten" />
	<button type="submit">Submit</button>
</form>
