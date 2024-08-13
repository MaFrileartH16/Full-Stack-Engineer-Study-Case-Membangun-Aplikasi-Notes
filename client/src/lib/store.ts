// src/lib/store.ts
import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './features/notesSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			notes: notesReducer,
		},
	});
};