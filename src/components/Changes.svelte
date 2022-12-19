<script>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { insert } from "$utils/supabase.js";
	import { range } from "d3";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

	const client = createClient(supabaseUrl, supabaseAnonKey);

	let players = {};
	let user;
	let name;
	let word;

	$: console.log(players);

	const generateId = (l) => {
		const vals = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
		const password = range(l)
			.map(() => {
				const a = Math.floor(Math.random() * vals.length);
				return vals[a];
			})
			.join("");

		return password;
	};

	const submitName = async () => {
		user = generateId(6);
		const response = await insert({
			table: "wordgame_tournament-players",
			data: { name, user }
		});
	};

	const submitWord = async () => {
		await insert({
			table: "wordgame_tournament-answers",
			data: { user, text: word }
		});
		word = "";
	};

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
				const p = players[payload.new.user];
				p.answers = [...p.answers, payload.new.text];
				players = players;
			}
		)
		.subscribe();

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
</script>

<section class="name" class:visible={!user}>
	<p>enter your name</p>
	<form on:submit|preventDefault={submitName}>
		<input bind:value={name} />
		<button type="submit">Submit</button>
	</form>
</section>

<section class="play" class:visible={user}>
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

<style>
	section {
		display: none;
	}

	.visible {
		display: block;
	}

	.players {
		display: flex;
	}

	.player {
		padding: 1rem;
	}
</style>
