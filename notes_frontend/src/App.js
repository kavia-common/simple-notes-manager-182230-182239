import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { newId } from './utils/id';

// Data shape: { id: string, title: string, body: string, updatedAt: number }
// Storage keys
const NOTES_KEY = 'notes.v1';
const SELECTED_KEY = 'notes.selectedId.v1';

// PUBLIC_INTERFACE
function App() {
  /** This is the main application component for the Simple Notes app. It manages note state, selection, and persistence via localStorage. */

  // Persist notes and selectedId in localStorage
  const [notes, setNotes] = useLocalStorage(NOTES_KEY, []);
  const [selectedId, setSelectedId] = useLocalStorage(SELECTED_KEY, null);

  const [query, setQuery] = useState('');

  // Derived: sort by updatedAt desc
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes]);

  const activeNote = useMemo(
    () => sortedNotes.find((n) => n.id === selectedId) || null,
    [sortedNotes, selectedId]
  );

  // Ensure selectedId points to a valid note
  useEffect(() => {
    if (selectedId && !notes.find((n) => n.id === selectedId)) {
      setSelectedId(sortedNotes[0]?.id || null);
    }
  }, [notes, selectedId, setSelectedId, sortedNotes]);

  // PUBLIC_INTERFACE
  const createNote = useCallback(() => {
    /** Create a new note titled 'Untitled', select it, and persist. */
    const note = {
      id: newId(),
      title: 'Untitled',
      body: '',
      updatedAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setSelectedId(note.id);
  }, [setNotes, setSelectedId]);

  // PUBLIC_INTERFACE
  const selectNote = useCallback((id) => {
    /** Select a note by id. */
    setSelectedId(id);
  }, [setSelectedId]);

  // PUBLIC_INTERFACE
  const updateNote = useCallback((id, updates) => {
    /** Update a note by id with given fields and bump updatedAt. */
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n))
    );
  }, [setNotes]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback((id) => {
    /** Delete a note by id with confirmation. Select next most recent if active was deleted. */
    const toDelete = notes.find((n) => n.id === id);
    if (!toDelete) return;

    const ok = window.confirm('Delete this note? This action cannot be undone.');
    if (!ok) return;

    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      // select next most recent from remaining
      const remaining = sortedNotes.filter((n) => n.id !== id);
      setSelectedId(remaining[0]?.id || null);
    }
  }, [notes, selectedId, setNotes, setSelectedId, sortedNotes]);

  // PUBLIC_INTERFACE
  const duplicateNote = useCallback((id) => {
    /** Duplicate a note by id, prefix title with 'Copy -', select it. */
    const original = notes.find((n) => n.id === id);
    if (!original) return;

    const copy = {
      ...original,
      id: newId(),
      title: original.title ? `Copy - ${original.title}` : 'Copy - Untitled',
      updatedAt: Date.now(),
    };
    setNotes((prev) => [copy, ...prev]);
    setSelectedId(copy.id);
  }, [notes, setNotes, setSelectedId]);

  const filteredNotes = useMemo(() => {
    if (!query.trim()) return sortedNotes;
    const q = query.toLowerCase();
    return sortedNotes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q)
    );
  }, [query, sortedNotes]);

  return (
    <div className="app-root">
      <Header
        onToggleTheme={() => {
          // Theme toggling handled by Header internally via document data-theme
        }}
      />
      <main className="main-layout">
        <aside className="notes-pane">
          <NotesList
            notes={filteredNotes}
            activeId={selectedId}
            onNew={createNote}
            onSelect={selectNote}
            onDelete={deleteNote}
            query={query}
            onQueryChange={setQuery}
          />
        </aside>
        <section className="editor-pane">
          {activeNote ? (
            <NoteEditor
              note={activeNote}
              onChange={(fields) => updateNote(activeNote.id, fields)}
              onSave={() => {/* no-op explicit save because autosave; keep button for UX */}}
              onDelete={() => deleteNote(activeNote.id)}
              onDuplicate={() => duplicateNote(activeNote.id)}
            />
          ) : (
            <div className="empty-state">
              <p className="empty-title">No note selected</p>
              <p className="empty-subtitle">Create a note to get started.</p>
              <button className="btn btn-primary" onClick={createNote} aria-label="Create a new note">
                + New Note
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
