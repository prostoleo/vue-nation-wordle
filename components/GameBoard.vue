<template>
	<article>
		<ul class="bg-green-800/10 rounded-md p-4 grid gap-3">
			<li
				v-for="([guess, hint], index) in state"
				:key="index"
				class="flex gap-1"
			>
				<span
					v-for="(letter, i) in guess"
					:key="i"
					class="flex items-center justify-center font-semibold uppercase text-xl leading-none p-2 w-8 h-8 text-gray-900"
					:class="hintMapColors[hint[i]]"
				>
					{{ letter }}
				</span>
			</li>
		</ul>
	</article>
</template>

<script setup lang="ts">
	defineProps({
		state: Array as () => GameState,
	});

	const hintMapColors = {
		0: 'bg-red-200',
		1: 'bg-yellow-200',
		2: 'bg-green-200',
	};
</script>

<style lang="scss" scoped></style>
