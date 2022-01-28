<template>
	<form @submit.prevent="submitGuess" class="mt-6">
		<label for="#input-guess" class="block mb-2 font-semibold"
			>Your guess</label
		>
		<input
			id="input-guess"
			type="text"
			v-model="guess"
			minlength="5"
			maxlength="5"
			class="bg-cool-gray-700/80 px-5 py-3 rounded-md"
		/>
		<button
			:disabled="guess && guess.length !== 5"
			class="inline-block bg-green-500 rounded-md py-3 px-5 text-white text-base font-semibold disabled:(filter-{hue-15deg}, cursor-not-allowed)"
		>
			Guess
		</button>
	</form>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		(event: 'guess', guess: string);
	}>();

	const guess = ref('');

	function submitGuess() {
		emit('guess', guess.value);

		guess.value = '';
	}
</script>

<style scoped>
	button:disabled {
		filter: grayscale(50%);
		cursor: not-allowed;
	}
</style>
