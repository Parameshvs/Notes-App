import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { Note } from '../types/Note';

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const { searchNotes } = useNotes();
  const [results, setResults] = useState<Note[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    const filteredNotes = searchNotes(e.target.value);
    setResults(filteredNotes);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes"
        value={keyword}
        onChange={handleSearch}
      />
      <ul>
        {results.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
