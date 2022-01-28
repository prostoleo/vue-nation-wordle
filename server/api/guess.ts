import { defineHandle, useBody, useCookie, setCookie, createError } from 'h3';

// импорт storage from nitro alias

import { storage } from '#storage';
import MemoryDriver from 'unstorage/drivers/memory';

storage.mount('', MemoryDriver());

import wordlist from 'wordlist-english';
const validWords: Array<string> = wordlist['english/10'].filter(
	(word: string) => word.length === 5
);

// * используем nuxt server/api - чтобы загаданное слово не было "слито" на клиентскую часть
// todo здесь можно взаимодействовать с БД

// функция помощник из строки -> в объект
const decode = (state = '[]'): GameState => JSON.parse(state);
const encode = (state: GameState): string => JSON.stringify(state);

export default defineHandle(async (req, res) => {
	// вытаскиваем загаднное слово
	const { guess } = await useBody(req);

	// если слова нет или длина загаданного слова не 5
	if (!guess || guess.length !== 5) {
		return createError({
			statusCode: 422,
			message: 'Invalid guess',
		});
	}

	// загаданное слово
	const day = new Date().toISOString().slice(0, 10);
	const word: string =
		(await storage.getItem(day)) ||
		validWords[Math.floor(Math.random() * validWords.length)];
	console.log('word: ', word);

	// const word = 'spock';
	await storage.setItem(day, word);

	// сохраняем слово в куки
	const state: GameState = decode(useCookie(req, 'state'));
	// const state: GameState = [[guess, generateHint(word, guess)]];

	// добавляем в state предположительный вариант
	state.push([guess, generateHint(word, guess)]);

	setCookie(res, 'state', encode(state));

	return state;
});

//todo генерируем подсказку для пользователя
function generateHint(word: string, guess: string) {
	// получаем массив из букв
	// const source = [...word];
	const source = word.split('');

	// мой вариант
	// const res = [...guess]
	const res = guess
		.split('')
		.map((letter, i) => {
			if (letter === word[i]) {
				// source[i] = null;

				// return true;
				return '2';
			} else if (word.includes(letter)) {
				return '1';
			}

			return '0';
		})
		.join('');

	console.log('res: ', res);
	return res;

	// вариант daniel roe
	// /* return [...guess]
	/* return guess.split('')
		.map((letter, i) => {
			if (letter === word[i]) {
				source[i] = null;

				return true;
			}
			return false;
		})
		.map((exact, i) => {
			if (exact) return '2';
			if (source.includes(guess[i])) return '1';
			return '0';
		})
		.join(''); */
}
