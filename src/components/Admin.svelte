<script>
	// send: enter name
	// send: between round
	// send: game, round, clue-id
	// send start event ~0 + latency
	// local runs visual timer between
	// send end start ~ 60 + latency
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { browser } from "$app/environment";
	import { createClient } from "@supabase/supabase-js";
	import Game from "$components/Game.svelte";
	import clues from "$data/clues.csv";

	const DURATION = 60;

	const clock = tweened(DURATION);
	let channel;
	let clueText;
	let clueId;
	let round = 1;

	const setupBroadcast = () => {
		const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
		const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game");

		channel.subscribe();
	};

	const startClock = () => {
		clock.set(DURATION, { duration: 0 });
		clock.set(0, { duration: 1000 * DURATION }).then(() => {
			console.log("end");
			round += 1;
			send({ event: "clock", payload: false });
		});
	};

	const send = ({ event, payload }) => {
		// console.log(event, payload);
		channel.send({
			type: "broadcast",
			event,
			payload
		});

		if (event === "clock" && payload) startClock();
	};

	const onClueChange = (e) => {
		clueId = e.target.value;
		clueText = clues.find((d) => d.id === clueId).text;
	};

	onMount(async () => {
		setupBroadcast();
	});
</script>

<section>
	<h1>Admin</h1>

	<h2>View</h2>
	<button on:click={() => send({ event: "view", payload: "name" })}>name</button
	>
	<button on:click={() => send({ event: "view", payload: "play" })}>play</button
	>

	<h2>Clock</h2>
	<button on:click={() => send({ event: "clock", payload: true })}>start</button
	>
	<p>{$clock.toFixed(2)}</p>

	<h2>Round {round}</h2>

	<h2>Clue</h2>
	<select on:change={onClueChange}>
		{#each clues as clue, i}
			<option value={clue.id}>{i + 1}. {clue.text}</option>
		{/each}
	</select>
	<button
		on:click={() =>
			send({ event: "clue", payload: { text: clueText, id: clueId } })}
		>set clue</button
	>
</section>

<section>
	<h2>Game Board</h2>
	<Game admin={true} />
</section>
