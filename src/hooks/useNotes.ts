import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getNotes, createNote, updateNote, deleteNote} from '../api/notes';
import {Note} from '../redux/slices/noteSlice';

type UpdateNoteInput = {
  id: string;
  data: Partial<Note>;
};

export const useNotes = () => {
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: getNotes,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['notes']}),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, UpdateNoteInput>({
    mutationFn: ({id, data}) => updateNote(id, data),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['notes']}),
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['notes']}),
  });
};
