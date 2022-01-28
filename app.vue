<template>
	<div class="container mx-auto min-h-screen">
		<header class="py-6 px-3 bg-blue-gray-900/25 rounded-md shadow-light-50">
			<nav>
				<ul class="flex gap-x-2 text-lg font-medium">
					<li><NuxtLink to="/" class="hover:opacity-75">worddle</NuxtLink></li>
					<li><NuxtLink to="/game" class="hover:opacity-75">game</NuxtLink></li>
				</ul>
			</nav>
		</header>
		<main>
			<!-- рендерим необходимую страницу -->
			<NuxtPage />
		</main>

		<footer
			class="py-6 px-3 bg-gray-900/75 rounded-md shadow-light-50 flex justify-center"
		>
			Made with love &#10084;
		</footer>
	</div>
</template>

<style>
	body {
		@apply bg-gray-800 text-light-50;
	}

	.container {
		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	header > nav > ul > li a.router-link-active {
		@apply text-green-500;
	}
</style>
