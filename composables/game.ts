const decode = (state = '[]'): GameState => JSON.parse(state);
const encode = (state: GameState): string => JSON.stringify(state);

export const useGameState = () => {
	const state = useCookie<GameState>('state', {
		encode,
		decode,
		default: () => [],
	});
	// console.log('state: ', state);
	// const state = [['guess', '01122']];

	async function submitGuess(guess: string) {
		state.value = await $fetch('/api/guess', {
			method: 'POST',
			body: {
				guess,
			},
		});
	}

	return {
		state,
		submitGuess,
	};
};
