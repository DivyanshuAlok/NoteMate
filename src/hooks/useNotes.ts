import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getNotes, createNote, updateNote, deleteNote} from '../api/notes';
import {Note} from '../redux/slices/noteSlice';

export const useNotes = () => {
  return useQuery({
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
  return useMutation({
    mutationFn: ({id, data}: {id: string; data: Partial<Note>}) =>
      updateNote(id, data),
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
