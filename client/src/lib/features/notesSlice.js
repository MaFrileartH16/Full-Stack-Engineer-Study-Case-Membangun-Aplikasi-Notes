import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/notes';

// Async thunks for CRUD operations
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note) => {
	const response = await axios.post(API_URL, note);
	return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({id, note}) => {
	const response = await axios.put(`${API_URL}/${id}`, note);
	return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

export const fetchNoteById = createAsyncThunk('notes/fetchNoteById', async (id) => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
});

const notesSlice = createSlice({
	name: 'notes',
	initialState: {
		notes: [],
		status: 'idle',
		error: null,
		selectedNote: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.notes = action.payload;
			})
			.addCase(fetchNotes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createNote.fulfilled, (state, action) => {
				state.notes.push(action.payload);
			})
			.addCase(updateNote.fulfilled, (state, action) => {
				const index = state.notes.findIndex(note => note.id === action.payload.id);
				state.notes[index] = action.payload;
			})
			.addCase(deleteNote.fulfilled, (state, action) => {
				state.notes = state.notes.filter(note => note.id !== action.payload);
			})
			.addCase(fetchNoteById.fulfilled, (state, action) => {
				state.selectedNote = action.payload;
			});
	},
});

export default notesSlice.reducer;