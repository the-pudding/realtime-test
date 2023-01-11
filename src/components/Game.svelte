<script>
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { browser } from "$app/environment";
	import { createClient } from "@supabase/supabase-js";
	import { insert } from "$utils/supabase.js";
	import { range, scaleLinear, max } from "d3";
	import loadCsv from "$utils/loadCsv.js";

	export let admin;

	const PLAYER_WIDTH = 160;
	const DURATION = 60;
	const COLORS = [
		"#8dd3c7",
		"#ffffb3",
		"#bebada",
		"#fb8072",
		"#80b1d3",
		"#fdb462",
		"#b3de69",
		"#fccde5",
		"#d9d9d9",
		"#bc80bd",
		"#ccebc5",
		"#ffed6f"
	];

	const reasons = [
		"(or a variation) was played by opponent",
		"is too short",
		"contains non-letters",
		"is not in the word list",
		"(or a variation) was already entered"
	];

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

	const client = createClient(supabaseUrl, supabaseAnonKey);

	const clock = tweened(10);

	let xScale = scaleLinear();

	let raceWidth = 100;
	let round = 1;
	let gameId;
	let disabled = true;
	let channel;
	let players = {};
	let user;
	let name;
	let word;
	let view;
	let clueId;
	let clueText;
	let answerKey;
	let validWords;

	// let playedLemmas;

	$: console.log({ clueText });

	const lemmaExists = ({ lemmas, corpus }) => {
		const filtered = lemmas.split("|").filter((l) => {
			return !!corpus.find((c) => c === l);
		});

		return !!filtered.length;
	};

	const lookupLemmas = (text) => {
		const match = answerKey.find((d) => d.word === text);
		return match ? match.lemmas : "";
	};

	const isWordlist = (text) => !validWords.includes(text);

	// const isTaken = (lemmas) => {
	// 	const match = playedLemmas.find(d => d === lemmas);
	// 	if (match) console.log(match.)
	// 	return !match;
	// };

	const isDuplicate = ({ text, lemmas }) => {
		const corpus = players[user].answers.map((d) => d.lemmas);
		return lemmaExists({ lemmas, corpus });
	};

	const isNotAlpha = (text) => new RegExp(/([^a-z])/, "g").test(text);

	const validate = ({ text, lemmas }) => {
		let valid = true;
		let reason;
		if (text.length < 4) {
			valid = false;
			reason = 1;
		} else if (isNotAlpha(text)) {
			valid = false;
			reason = 2;
		} else if (isWordlist(text)) {
			valid = false;
			reason = 3;
		} else if (isDuplicate({ text, lemmas })) {
			valid = false;
			reason = 4;
		}
		// else if (isTaken({ text, lemmas })) {
		// 	valid = false;
		// 	reason = 0;
		// }

		return { valid, reason };
	};

	const getPoints = ({ text }) => {
		const { points } = answerKey.find((d) => d.word === text);
		return +points;
	};

	const generateId = (l) => {
		const vals = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
		const id = range(l)
			.map(() => {
				const a = Math.floor(Math.random() * vals.length);
				return vals[a];
			})
			.join("");

		return id;
	};

	const submitName = async () => {
		user = generateId(6);
		const response = await insert({
			table: "wordgame_tournament-players",
			data: { name, user }
		});
	};

	const subscribeAnswers = () => {
		client
			.channel("public:tournament-answers")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "wordgame_tournament-answers"
				},
				(payload) => {
					// TODO more efficient way to reactively update?
					const p = players[payload.new.user];
					p.answers = [
						...p.answers,
						{ text: payload.new.text, lemmas: payload.new.lemmas }
					];

					p.score += payload.new.points;
					// playedLemmas.push({
					// 	self: payload.new.user === user,
					// 	timestamp: payload.new.created_at,
					// 	lemmas: payload.new.lemmas
					// });
					players = players;
				}
			)
			.subscribe();
	};

	const subscribePlayers = () => {
		client
			.channel("public:info")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "wordgame_tournament-players"
				},
				(payload) => {
					players[payload.new.user] = {
						name: payload.new.name,
						answers: [],
						score: 0
					};
					console.log(players);
				}
			)
			.subscribe();
	};

	const submitWord = async () => {
		const text = word;
		const lemmas = lookupLemmas(text);
		const { valid, reason } = validate({ text, lemmas });
		const points = valid ? getPoints({ text }) : undefined;

		resetInput();

		if (valid) {
			await insert({
				table: "wordgame_tournament-answers",
				data: { user, text, clue: clueId, lemmas, points, game: gameId, round }
			});
		}

		console.log(reason, reasons[reason]);
	};

	const resetPlayerAnswers = () => {
		for (let d in players) {
			players[d].answers = [];
		}
	};

	const resetInput = () => {
		word = "";
	};

	const resetClue = () => {
		clueId = "";
		clueText = "";
	};

	const resetClock = () => {
		clock.set(DURATION, { duration: 0 });
	};

	const resetScore = () => {
		for (let d in players) {
			players[d].score = [];
		}
	};

	const updateScale = () => {
		xScale.range([raceWidth - PLAYER_WIDTH, 0]);
		xScale = xScale;
	};

	$: isPlayer = !admin;
	$: scores = Object.values(players).map((d) => d.score);
	$: maxScore = max(scores);
	$: xDomain = [0, maxScore || 1];
	$: xScale.domain(xDomain);
	$: updateScale(raceWidth);

	onMount(() => {
		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game");

		channel
			.on("broadcast", { event: "clue" }, async ({ payload }) => {
				const { id, text } = payload;
				const url = `https://pudding.cool/games/words-against-strangers-data/clue-answers/${id}.csv?version=${Date.now()}`;
				answerKey = await loadCsv(url);
				validWords = answerKey.map((d) => d.word);
				clueText = text;
				clueId = id;
			})
			.on("broadcast", { event: "view" }, ({ payload }) => {
				view = payload;
			})
			.on("broadcast", { event: "clock" }, ({ payload }) => {
				if (payload) {
					clock.set(DURATION, { duration: 0 });
					disabled = false;
					clock.set(0, { duration: DURATION * 1000 }).then(() => {
						console.log("promise", Date.now());
					});
				} else {
					console.log("stop", Date.now(), $clock);
					disabled = true;
				}
			})
			.on("broadcast", { event: "game" }, ({ payload }) => {
				gameId = payload;
			})
			.on("broadcast", { event: "round" }, ({ payload }) => {
				round = payload;
			})
			.on("broadcast", { event: "clear" }, ({ payload }) => {
				resetPlayerAnswers();
				resetInput();
				resetClock();
				resetScore();
				resetClue();
			})
			.subscribe();

		subscribeAnswers();
		subscribePlayers();
	});
</script>

{#if view === "name" && isPlayer}
	<section class="name">
		<div class="ui">
			<p class:hidden={!user}>thanks {name}! please wait.</p>

			<form on:submit|preventDefault={submitName} class:hidden={user}>
				<label for="name">enter your name</label>
				<input id="name" bind:value={name} maxlength="12" />
				<button type="submit">&rarr;</button>
			</form>
		</div>
	</section>
{:else if view === "play" || admin}
	<section class="play">
		{#if isPlayer}
			<div class="ui">
				<h3 class="time">time: {$clock.toFixed(2)}</h3>
				<h3 class="clue">clue:</h3>
				<ul class="clues">
					{#each clueText.split("|") as c}
						<li>{@html c}</li>
					{/each}
				</ul>
				<form on:submit|preventDefault={submitWord}>
					<input bind:value={word} {disabled} />
					<button type="submit" {disabled}>&rarr;</button>
				</form>

				<ul class="answers">
					{#each players[user].answers as { text, lemmas }}
						<li>{text}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="race" bind:clientWidth={raceWidth}>
			<ul class="players">
				{#each Object.keys(players) as key, i}
					{@const name = players[key].name}
					{@const score = players[key].score}
					{@const right = `${xScale(score)}px`}
					{@const width = `${PLAYER_WIDTH}px`}
					{@const background = COLORS[i]}
					<li class="player-wrapper">
						<div class="player" style:right style:width style:background>
							<p>
								<span class="name">{name}</span><span class="score"
									>{score}</span
								>
							</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{:else}
	<section>
		<h2>please wait for game to begin</h2>
	</section>
{/if}

<style>
	h2 {
		text-align: center;
		margin: 0;
		margin-top: 64px;
	}

	h3 {
		margin: 0;
	}

	p {
		margin: 0;
	}

	.play {
		display: flex;
		padding: 32px 16px;
	}

	.ui {
		width: 15rem;
		flex-grow: 0;
		margin-right: 16px;
		padding: 16px;
		background: var(--color-gray-100);
	}

	.race {
		flex-grow: 1;
	}

	.players {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.play li {
		width: 100%;
		position: relative;
		list-style-type: none;
		margin-bottom: 0.5rem;
	}

	li.player-wrapper {
		height: 3rem;
	}

	.player {
		top: 0;
		padding: 0.5rem;
		position: absolute;
		transition: right 0.25s ease-in-out;
		margin: 0;
		left: auto;
	}

	.player p {
		display: flex;
		justify-content: space-between;
		margin: 0;
	}

	.name {
		font-weight: 700;
	}

	.hidden {
		display: none;
	}

	input {
		width: calc(100% - 48px);
	}

	button {
		width: 32px;
	}

	.ui ul {
		list-style-type: none;
		margin: 0 16px;
		padding: 0;
		display: flex;
		flex-direction: column-reverse;
	}
	.ui ul.answers li:last-of-type {
		margin-top: 1rem;
	}

	.ui ul.clues {
		list-style-type: disc;
	}

	.ui .clue {
		margin-bottom: 16px;
	}
</style>
