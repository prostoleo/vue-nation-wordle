<template>
	<section>
		<h2 class="text-4xl font-bold mt-[1em] mb-[2em]">Playing game now</h2>
		<GameBoard :state="state" v-if="state.length > 0"></GameBoard>
		<GuessForm @guess="submitGuess" />
	</section>
</template>

<script setup lang="ts">
	import { useGameState } from '~/composables/game';

	const { state, submitGuess } = useGameState();
	// console.log('state: ', state);
</script>

<style lang="scss" scoped></style>
