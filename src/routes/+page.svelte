<script>
	import Meta from "$components/Meta.svelte";
	import Game from "$components/Game.svelte";
	import version from "$utils/version.js";

	version();
</script>

<Meta
	title="🏆 tournament of champions 🏆"
	description="words against strangers: tournament of champions"
	url="https://the-pudding.github.io/tournament-of-champions"
/>
<Game />
