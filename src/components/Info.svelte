<script>
	export let gameId;
	export let round;
	export let spectator;
	export let clueText;
</script>

<h2>{gameId}: round {round}</h2>
{#if spectator}
	<p>
		clue: {#each clueText.split("|") as c}<span>{@html c}</span>{/each}
	</p>
{/if}

<style>
	h2 {
		text-align: center;
		margin: 0;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	span {
		margin-right: 8px;
		background: var(--color-gray-100);
		padding: 8px;
	}
</style>
