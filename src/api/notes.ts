import {Note} from '../redux/slices/noteSlice';
import api from './axios';

type NoteInput = {
  title: string;
  content: string;
  pinned?: boolean;
  color?: string | null;
  imageUrls?: string[];
};

export const getNotes = async ({pageParam = 1}) => {
  const response = await api.get('/notes', {
    params: {
      page: pageParam,
      limit: 20,
    },
  });
  return response.data;
};

export const createNote = async (note: Note) => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const updateNote = async (id: string, note: Partial<Note>) => {
  const response = await api.put('/notes', {...note, id});
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete('/notes', {data: {id}});
  return response.data;
};
