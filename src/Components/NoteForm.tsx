import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import { Note } from '../types/Note';

interface NoteFormProps {
  note?: Note;
  onSubmit: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSubmit }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const { addNote, editNote } = useNotes();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote = { id: note ? note.id : `${Date.now()}`, title, content };
    if (note) {
      editNote(newNote);
    } else {
      addNote(newNote);
    }
    onSubmit();
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
      <button type="submit">{note ? 'Edit Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
