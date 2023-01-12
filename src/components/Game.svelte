<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { tweened } from "svelte/motion";
	import { browser } from "$app/environment";
	import { createClient } from "@supabase/supabase-js";
	import { insert } from "$utils/supabase.js";
	import { range } from "d3";
	import loadCsv from "$utils/loadCsv.js";
	import Name from "$components/Name.svelte";
	import Answers from "$components/Answers.svelte";
	import Race from "$components/Race.svelte";
	import Info from "$components/Info.svelte";
	import UserInput from "$components/UserInput.svelte";

	export let spectator = false;

	const dispatch = createEventDispatcher();

	const duration = 60;
	const colors = [
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

	const clock = tweened(duration);

	let reveal;
	let timeout;
	let round = 1;
	let gameId;
	let disabled = true;
	let channel;
	let players = {};
	let user;
	let name;
	let view;
	let clueId;
	let clueText = "";
	let answerKey;
	let validWords;
	let invalid = "";
	let userInput;

	// let playedLemmas;

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

	const onSubmitName = async ({ detail }) => {
		name = detail;
		if (!name) return;
		user = generateId(6);
		const response = await insert({
			table: "wordgame_tournament-players",
			data: { name, user }
		});
	};

	const onSubmitWord = async ({ detail }) => {
		const text = detail;
		const lemmas = lookupLemmas(text);
		const { valid, reason } = validate({ text, lemmas });
		const points = valid ? getPoints({ text }) : undefined;

		if (valid) {
			await insert({
				table: "wordgame_tournament-answers",
				data: { user, text, clue: clueId, lemmas, points, game: gameId, round }
			});
		} else {
			if (timeout) clearTimeout(timeout);
			invalid = `${text} ${reasons[reason]}`;
			timeout = setTimeout(() => {
				invalid = "";
			}, 2000);
		}
	};

	const resetPlayerAnswers = () => {
		for (let d in players) {
			players[d].answers = [];
		}
	};

	const resetClue = () => {
		clueId = "";
		clueText = "";
	};

	const resetClock = () => {
		clock.set(duration, { duration: 0 });
	};

	const resetScore = () => {
		for (let d in players) {
			players[d].score = 0;
		}
	};

	const onPlayerClick = (key) => {
		if (spectator) dispatch("toggle", key);
	};

	const subscribeToBroadcast = () => {
		channel
			.on("broadcast", { event: "clue" }, async ({ payload }) => {
				reveal = false;
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
					clock.set(duration, { duration: 0 });
					disabled = false;
					reveal = true;
					if (!spectator && !players[user].disabled) userInput.focus();
					clock.set(0, { duration: duration * 1000 }).then(() => {
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
			.on("broadcast", { event: "toggle" }, ({ payload }) => {
				players[payload].disabled = !players[payload].disabled;
			})
			.subscribe();
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
						score: 0,
						disabled: false
					};
				}
			)
			.subscribe();
	};

	$: isPlayer = !spectator;
	$: showAnswers =
		spectator || disabled || (players[user] && players[user].disabled);
	$: showUserInput = isPlayer && players[user] && !players[user].disabled;
	$: showName = view === "name" && isPlayer;
	$: showInfo = view === "play" || spectator;

	onMount(() => {
		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game");

		subscribeToBroadcast();
		subscribeAnswers();
		subscribePlayers();
	});
</script>

{#if showName}
	<section class="name">
		<div class="ui">
			<Name {user} on:submit={onSubmitName} />
		</div>
	</section>
{:else if showInfo}
	<section class="info">
		<Info {gameId} {round} {spectator} {clueText} />
	</section>
	<section class="play">
		{#if showUserInput}
			<div class="ui">
				<UserInput
					bind:this={userInput}
					answers={players[user].answers}
					time={$clock}
					{reveal}
					{clueText}
					{disabled}
					{invalid}
					on:submit={onSubmitWord}
				/>
			</div>
		{/if}

		<Race {players} {colors} {spectator} {user} on:click={onPlayerClick} />
	</section>

	<section class="answers">
		{#if showAnswers}
			<Answers {players} {colors} />
		{/if}
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

	section {
		padding: 16px;
	}

	.play {
		display: flex;
	}

	.ui {
		width: 15rem;
		flex-grow: 0;
		margin-right: 16px;
		padding: 16px;
		background: var(--color-gray-100);
	}
</style>
