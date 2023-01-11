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
	let gameId;
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
			round += 1;
			send({ event: "clock", payload: false });
		});
	};

	const send = ({ event, payload }) => {
		if (!channel) return;
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

	const onGameIdSubmit = (e) => {
		gameId = e.target[0].value;
		e.target[0].value = "";
		send({ event: "game", payload: gameId });
	};

	const onToggle = ({ detail }) => {
		send({ event: "toggle", payload: detail });
	};

	const onClear = () => {
		clock.set(DURATION, { duration: 0 });
		send({ event: "clear" });
	};

	$: send({ event: "round", payload: round });

	onMount(async () => {
		setupBroadcast();
	});
</script>

<section>
	<h2>admin</h2>

	<fieldset>
		<h3>setup</h3>
		<form on:submit|preventDefault={onGameIdSubmit}>
			<label for="gameid">game id</label>
			<input id="gameid" />
			<input type="submit" value="Submit" />
		</form>
		<p>game id: {gameId}</p>
	</fieldset>

	<fieldset>
		<h3>show name view</h3>
		<button on:click={() => send({ event: "view", payload: "name" })}
			>show name</button
		>
	</fieldset>

	<fieldset>
		<h3>clue stuff</h3>
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
		<!-- TODO -->
		<!-- <button
		on:click={() =>
			send({ event: "clue", payload: { text: clueText, id: clueId } })}
		>reveal clue</button
	> -->
	</fieldset>

	<fieldset>
		<h3>show play view</h3>
		<button on:click={() => send({ event: "view", payload: "play" })}
			>show play</button
		>
	</fieldset>

	<fieldset>
		<h3>clock</h3>

		<button on:click={() => send({ event: "clock", payload: true })}
			>start</button
		>
		<p>{$clock.toFixed(2)}</p>
	</fieldset>

	<fieldset>
		<h3>prepare for new round</h3>
		<button on:click={onClear}>clear</button>
	</fieldset>
</section>

<section>
	<Game spectator={true} on:toggle={onToggle} />
</section>

<style>
	section {
		padding: 16px;
		margin: 16px;
	}

	fieldset {
		margin: 16px 0;
	}
</style>
