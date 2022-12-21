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

	const clock = tweened(0);
	let channel;
	let clueText;
	let clueId;

	const setupBroadcast = () => {
		const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
		const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game");

		channel.subscribe();
	};

	const startClock = () => {
		clock.set(0, { duration: 0 });
		clock.set(10, { duration: 10000 }).then(() => {
			console.log("end");
			send({ event: "clock", payload: false });
		});
	};

	const send = ({ event, payload }) => {
		channel.send({
			type: "broadcast",
			event,
			payload
		});

		if (event === "clock" && payload) startClock();
	};

	onMount(async () => {
		setupBroadcast();
		clueId = 750;
		clueText = "doesn't end with <span>k</span>|starts with <span>in</span>";
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

	<h2>Clue</h2>
	<button
		on:click={() =>
			send({ event: "clue", payload: { text: clueText, id: clueId } })}
		>clue</button
	>
</section>
