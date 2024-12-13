import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Note } from '../types/Note';

interface NotesState {
  notes: Note[];
}

interface NotesAction {
  type: 'SET_NOTES' | 'ADD_NOTE' | 'EDIT_NOTE' | 'DELETE_NOTE';
  payload?: any;
}

interface NotesContextProps extends NotesState {
  addNote: (note: Note) => void;
  editNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  searchNotes: (query: string) => Note[];
}

const initialState: NotesState = {
  notes: [],
};

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => (note.id === action.payload.id ? action.payload : note)),
      };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    default:
      return state;
  }
};

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNote = (note: Note) => dispatch({ type: 'ADD_NOTE', payload: note });
  const editNote = (note: Note) => dispatch({ type: 'EDIT_NOTE', payload: note });
  const deleteNote = (id: string) => dispatch({ type: 'DELETE_NOTE', payload: id });

  const searchNotes = (query: string) => {
    return state.notes.filter(
      note => note.title.toLowerCase().includes(query.toLowerCase()) || note.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      dispatch({ type: 'SET_NOTES', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ ...state, addNote, editNote, deleteNote, searchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within a NotesProvider');
  return context;
};
