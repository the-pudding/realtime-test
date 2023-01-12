<script>
	export let players;
	export let colors;
</script>

<div class="players">
	{#each Object.keys(players) as key, i}
		{@const background = colors[i]}
		{@const disabled = players[key].disabled}
		<div class="player" style:background>
			<p>{players[key].name}</p>
			<ul class="answers" class:disabled>
				{#each players[key].answers as { text }}
					<li>{text}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.players {
		display: flex;
		justify-content: space-evenly;
	}

	.player {
		padding: 8px;
	}

	p {
		font-weight: 700;
	}

	ul {
		display: flex;
		flex-direction: column-reverse;
		width: 160px;
	}

	ul.disabled {
		opacity: 0.5;
		filter: grayscale(100%);
	}

	li {
		margin: 0;
	}
</style>
