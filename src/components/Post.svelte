<script>
	export let players;
</script>

<div class="players">
	{#each Object.keys(players) as key, i}
		<div class="player">
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
		flex-direction: column;
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
