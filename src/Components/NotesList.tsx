import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';

const NoteList: React.FC = () => {
  const { notes, deleteNote } = useNotes();
  const [search, setSearch] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id: string) => {
    setEditingNote(id);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    if (editingNote === id) {
      setEditingNote(null);
    }
  };

  return (
    <div className="note-list">
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredNotes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      <NoteForm onSubmit={() => setEditingNote(null)} />
      {editingNote && (
        <NoteForm
          note={notes.find(note => note.id === editingNote)}
          onSubmit={() => setEditingNote(null)}
        />
      )}
    </div>
  );
};

export default NoteList;
