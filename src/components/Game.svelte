<script>
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { browser } from "$app/environment";
	import { createClient } from "@supabase/supabase-js";
	import { insert } from "$utils/supabase.js";
	import { range } from "d3";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

	const client = createClient(supabaseUrl, supabaseAnonKey);

	const clock = tweened(0);

	let channel;
	let players = {};
	let user;
	let name;
	let word;
	let view;

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
					p.answers = [...p.answers, payload.new.text];
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
					players[payload.new.user] = { name: payload.new.name, answers: [] };
				}
			)
			.subscribe();
	};

	const submitWord = async () => {
		await insert({
			table: "wordgame_tournament-answers",
			data: { user, text: word }
		});
		word = "";
	};

	onMount(() => {
		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game");

		channel
			.on("broadcast", { event: "view" }, ({ payload }) => {
				view = payload;
			})
			.on("broadcast", { event: "clock" }, ({ payload }) => {
				if (payload) {
					clock.set(0, { duration: 0 });
					clock.set(10, { duration: 10000 }).then(() => {
						console.log("promise", Date.now());
					});
				} else {
					console.log("stop", Date.now(), $clock);
					clock.set(10, { duration: 0 });
				}
			})
			.subscribe();

		subscribeAnswers();
		subscribePlayers();
	});
</script>

{#if view === "name"}
	<section class="name">
		<p>enter your name</p>
		<form on:submit|preventDefault={submitName}>
			<input bind:value={name} />
			<button type="submit">Submit</button>
		</form>
	</section>
{:else if view === "play"}
	<section class="play">
		<h2>time: {$clock.toFixed(2)}</h2>
		<p>Words that start with "p"</p>
		<form on:submit|preventDefault={submitWord}>
			<input bind:value={word} />
			<button type="submit">Submit</button>
		</form>

		<div class="players">
			{#each Object.keys(players) as key}
				<div class="player">
					<p class="name">{players[key].name}</p>
					<ul>
						{#each players[key].answers as answer}
							<li>{answer}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
{:else}
	<h2>Waiting for game to begin...</h2>
{/if}

<style>
	.player {
		padding: 1rem;
	}
</style>
