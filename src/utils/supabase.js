import { createClient } from "@supabase/supabase-js";

let ready = false;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const client = createClient(supabaseUrl, supabaseAnonKey);
const channel = client.channel("broadcast-test", {
	broadcast: { ack: false, self: true }
});

channel.on("broadcast", { event: "answer" }, (payload) => console.log(payload));

channel.subscribe(async (status) => {
	if (status === "SUBSCRIBED") {
		ready = status === "SUBSCRIBED";
		await channel.send({
			type: "broadcast",
			event: "answer",
			payload: { hello: "world" }
		});
	}
});

// const channel = supabase.channel("game", {
// 	broadcast: { self: true }
// });

// let ready = false;

// channel
// 	.on("broadcast", { event: "answer" }, (payload) => {
// 		console.log(payload);
// 	})
// 	.subscribe((status) => {
// 		console.log({ status });
// 		ready = status = "SUBSCRIBED";
// 	});

export const send = ({ user, word, points }) => {
	const payload = { send: "it" };
	if (ready) {
		channel.send({
			type: "broadcast",
			event: "answer",
			payload
		});
	}
};
