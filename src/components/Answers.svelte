<script>
	export let players;
</script>

<div class="players">
	{#each players as { name, user, disabled, background, answers }}
		<div class="player" style:background class:disabled>
			<p>{name}</p>
			<ul class="answers">
				{#each answers as { text, points, strike }}
					<li class:strike>{text} <span>{points}</span></li>
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

	.player.disabled {
		opacity: 0.5;
		filter: grayscale(100%);
	}

	p {
		font-weight: 700;
		font-size: var(--18px);
		margin: 0;
		margin-bottom: 8px;
	}

	ul {
		display: flex;
		flex-direction: column-reverse;
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0;
		list-style-type: none;
		font-size: var(--18px);
	}

	li.strike {
		text-decoration: line-through;
	}

	span {
		opacity: 0.75;
		font-size: var(--14px);
	}
</style>
