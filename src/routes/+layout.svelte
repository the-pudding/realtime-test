<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
</script>

<main id="content">
	<Header />
	<slot />
</main>

<style>
	main {
		min-height: 101vh;
	}
</style>
