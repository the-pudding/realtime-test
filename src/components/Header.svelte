<script>
	import wordmark from "$svg/wordmark.svg";
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div>
	<div class="intro">
		<h3>words against strangers</h3>
		<h1>🏆 tournament of champions 🏆</h1>
	</div>
</header>

<style>
	header {
		margin-bottom: 16px;
	}

	.wordmark {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 10em;
		max-width: 10em;
		padding: 1rem;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}

	.intro {
		text-align: center;
	}

	h1 {
		margin: 0;
	}

	h3 {
		margin: 0.5rem;
	}
</style>
