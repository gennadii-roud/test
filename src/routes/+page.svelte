<script lang="ts">
	let firstName = "";
	let lastName = "";
	let result: string | null = null;

	async function handleSubmit() {
		const formData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);

		try {
			const resp = await fetch("/contact", {
				method: "POST",
				body: formData
			});

			result = await resp.text();
		} catch (err) {
			result = "Server error";
		}
	}
</script>

<div style="display: flex; justify-content: center; align-items: center; min-width: 100%; min-height: 100%; background-color: navajowhite; position: absolute; inset: 0">
	<form
		on:submit|preventDefault={handleSubmit}
		style="display: flex; flex-direction: column; gap: 3rem"
	>
		<label>
			First Name:
			<input type="text" bind:value={firstName} required />
		</label>

		<label>
			Last Name:
			<input type="text" bind:value={lastName} required />
		</label>

		<button type="submit">Submit</button>
	</form>

	{#if result}
		<p>{result}</p>
	{/if}
</div>
