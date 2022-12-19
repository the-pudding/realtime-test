<script>
	const userId = "user_1234";
	const slackRoomId = "#random";

	const channel = supabase.channel(slackRoomId, {
		config: {
			presence: { key: userId }
		}
	});

	// We can subscribe to all Presence changes using the 'presence' -> 'sync' event.
	channel
		.on("presence", { event: "sync" }, () => presenceChanged())
		.subscribe();

	/*
  A contrived example where we bind to all keyboard
  events and send them over our channel
*/
	document.addEventListener("keydown", function (event) {
		channel.track({ isTyping: Date.now() });
	});

	// Receive Presence updates
	const presenceChanged = () => {
		const newState = channel.presenceState();
		console.log(newState);
	};
</script>
