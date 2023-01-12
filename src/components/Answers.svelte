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
		justify-content: center;
		border-top: 4px solid var(--color-black);
		padding-top: 16px;
	}

	.player {
		padding: 8px;
		width: 160px;
		padding: 8px;
		margin: 0 8px;
		border: 1px solid var(--color-gray-500);
	}

	p {
		font-weight: 700;
		font-size: var(--18px);
	}

	ul {
		display: flex;
		flex-direction: column-reverse;
		margin: 0;
		padding: 0;
	}

	ul.disabled {
		opacity: 0.5;
		filter: grayscale(100%);
	}

	li {
		margin: 0;
		list-style-type: none;
		font-size: var(--18px);
	}
</style>
