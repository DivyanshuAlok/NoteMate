import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  pinned?: boolean;
  color?: string;
  imageUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const idx = state.notes.findIndex(n => n.id === action.payload.id);
      if (idx !== -1) state.notes[idx] = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(n => n.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) note.pinned = true;
    },
    unpinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) note.pinned = false;
    },
  },
});

export const {addNote, updateNote, deleteNote, pinNote, unpinNote} =
  notesSlice.actions;
export default notesSlice.reducer;
