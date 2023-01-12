<script>
	import { createEventDispatcher } from "svelte";
	export let time;
	export let reveal;
	export let clueText;
	export let disabled;
	export let invalid;
	export let answers;

	export const focus = () => {
		inputEl.focus();
	};

	const dispatch = createEventDispatcher();

	let inputEl;
	let word;

	const onSubmitWord = () => {
		dispatch("submit", word);
		word = "";
	};
</script>

<h3 class="time">time: {time.toFixed(1)}</h3>
<h3 class="clue">clue:</h3>
<div class="clues">
	<ul class:reveal>
		{#each clueText.split("|") as c}
			<li>{@html c}</li>
		{/each}
	</ul>
</div>
<form on:submit|preventDefault={onSubmitWord}>
	<input bind:this={inputEl} bind:value={word} {disabled} />
	<button type="submit" {disabled}>&rarr;</button>
</form>
<p class="invalid">{invalid}</p>
<div class="answers">
	<ul>
		{#each answers as { text }}
			<li>{text}</li>
		{/each}
	</ul>
</div>

<style>
	h3 {
		margin: 0;
	}

	input {
		width: calc(100% - 48px);
	}

	button {
		width: 32px;
	}

	.answers {
		height: 320px;
		overflow-y: hidden;
	}

	.answers ul {
		list-style-type: none;
		margin: 0 16px;
		padding: 0;
		display: flex;
		flex-direction: column-reverse;
	}

	.clues ul {
		list-style-type: disc;
		margin-bottom: 16px;
		visibility: hidden;
	}

	.clues ul.reveal {
		visibility: visible;
	}

	.invalid {
		margin: 16px 0;
		color: var(--color-focus);
		height: 36px;
	}
</style>
