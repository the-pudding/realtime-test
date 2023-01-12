<script>
	import { scaleLinear, max } from "d3";
	import { createEventDispatcher } from "svelte";

	export let players;
	export let admin;

	const PLAYER_WIDTH = 200;
	const dispatch = createEventDispatcher();

	let raceWidth = 100;
	let xScale = scaleLinear();

	const updateScale = () => {
		xScale.range([raceWidth - PLAYER_WIDTH, 0]);
		xScale = xScale;
	};

	$: scores = players.map((d) => d.score);
	$: maxScore = max(scores);
	$: xDomain = [0, maxScore || 1];
	$: xScale.domain(xDomain);
	$: updateScale(raceWidth);
</script>

<div class="race" bind:clientWidth={raceWidth}>
	<ul class="players">
		{#each players as { name, user, disabled, background, score }}
			{@const right = `${xScale(score)}px`}
			{@const width = `${PLAYER_WIDTH}px`}
			<li class="player-wrapper">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="player"
					class:disabled
					class:admin
					style:right
					style:width
					style:background
					on:click={() => dispatch("click", user)}
				>
					<p>
						<span class="username">{name}</span><span class="score"
							>{score}</span
						>
					</p>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.race {
		flex-grow: 1;
	}

	.players {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	li.player-wrapper {
		height: 48px;
		position: relative;
		margin-bottom: 16px;
		list-style-type: none;
		width: 100%;
	}

	.player {
		top: 0;
		padding: 8px;
		position: absolute;
		transition: right 0.25s ease-in-out;
		margin: 0;
		left: auto;
		border: 1px solid var(--color-gray-500);
		pointer-events: none;
	}

	.player.admin {
		pointer-events: auto;
		cursor: pointer;
	}

	.player.disabled {
		opacity: 0.5;
		filter: grayscale(100%);
	}

	.player p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		user-select: none;
	}

	.username {
		font-weight: 700;
		font-size: var(--18px);
	}

	.score {
		font-size: var(--24px);
	}
</style>
