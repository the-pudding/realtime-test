<script>
	import { createEventDispatcher } from "svelte";

	export let user;

	const dispatch = createEventDispatcher();

	let name;

	const onSubmit = () => {
		dispatch("submit", name);
	};
</script>

<p class:hidden={!user}>thanks {name}! <br />please wait.</p>

<form on:submit|preventDefault={onSubmit} class:hidden={user}>
	<label for="name">enter your name</label>
	<input id="name" bind:value={name} maxlength="8" />
	<button type="submit">&rarr;</button>
</form>

<style>
	.hidden {
		display: none;
	}

	input {
		width: calc(100% - 48px);
	}

	button {
		width: 32px;
	}
</style>
