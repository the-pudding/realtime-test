<script>
	export let players;
	export let colors;
</script>

<div class="players">
	{#each Object.keys(players) as key, i}
		{@const background = colors[i]}
		<div class="player" style:background>
			<p>{players[key].name}</p>
			<ul class="answers">
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
	}

	li {
		margin: 0;
	}
</style>
