import React from 'react';
import NoteList from './Components/NotesList'; 
import { NotesProvider } from './context/NotesContext'; 
import './App.css'; 
const App: React.FC = () => {
  return (
    <NotesProvider>
      <div className="App">
        <h1>Notes Application</h1>
        <NoteList />
      </div>
    </NotesProvider>
  );
};

export default App;
