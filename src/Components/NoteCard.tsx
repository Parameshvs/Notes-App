import React from 'react';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => onEdit(note.id)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;
