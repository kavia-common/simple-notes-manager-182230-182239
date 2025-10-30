import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function NoteEditor({ note, onChange, onSave, onDelete, onDuplicate }) {
  /** NoteEditor provides inputs for title and body with debounced autosave, plus actions. */

  const [title, setTitle] = useState(note.title || 'Untitled');
  const [body, setBody] = useState(note.body || '');
  const debouncedRef = useRef({ timer: null });

  useEffect(() => {
    setTitle(note.title || 'Untitled');
    setBody(note.body || '');
  }, [note.id]); // switch when note changes

  // Debounced autosave
  useEffect(() => {
    if (debouncedRef.current.timer) clearTimeout(debouncedRef.current.timer);
    debouncedRef.current.timer = setTimeout(() => {
      onChange({ title, body });
    }, 350);
    return () => {
      if (debouncedRef.current.timer) clearTimeout(debouncedRef.current.timer);
    };
  }, [title, body, onChange]);

  const handleSaveClick = () => {
    onChange({ title, body });
    if (onSave) onSave();
  };

  return (
    <div className="note-editor" role="region" aria-label="Note editor">
      <div className="editor-header">
        <button className="btn btn-outline" onClick={onDuplicate} aria-label="Duplicate note">
          ⎘ Duplicate
        </button>
        <button className="btn btn-outline" onClick={handleSaveClick} aria-label="Save note">
          💾 Save
        </button>
        <button
          className="btn btn-outline"
          style={{ color: 'white', background: 'var(--error)' }}
          onClick={onDelete}
          aria-label="Delete current note"
        >
          🗑 Delete
        </button>
      </div>
      <div className="editor-body">
        <label htmlFor="note-title" style={{ fontWeight: 600, fontSize: 13, color: 'var(--secondary)' }}>
          Title
        </label>
        <input
          id="note-title"
          className="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
        <label htmlFor="note-body" style={{ fontWeight: 600, fontSize: 13, color: 'var(--secondary)' }}>
          Body
        </label>
        <textarea
          id="note-body"
          className="body-input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>
    </div>
  );
}
