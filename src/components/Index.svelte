<script>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";

	let channel;
	let subscribed;
	let value = "";

	let answers = [];

	const setupSupabase = () => {
		const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
		const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

		const client = createClient(supabaseUrl, supabaseAnonKey);
		channel = client.channel("game", { broadcast: { self: true } });

		channel
			.on("broadcast", { event: "answer" }, ({ payload }) => {
				answers = [...answers, payload.value];
			})
			.subscribe(async (status) => {
				subscribed = status === "SUBSCRIBED";
				await channel.send({
					type: "broadcast",
					event: "answer",
					payload: { value: "subscribed" }
				});
			});
	};

	onMount(() => {
		if (browser) setupSupabase();
	});

	const onSubmit = () => {
		if (channel && value) {
			channel.send({
				type: "broadcast",
				event: "answer",
				payload: { value }
			});
		}
		value = "";
	};
</script>

<form on:submit|preventDefault={onSubmit}>
	<input bind:value />
	<button type="submit">Enter</button>
</form>

<ul>
	{#each answers as answer}
		<li>{answer}</li>
	{/each}
</ul>
