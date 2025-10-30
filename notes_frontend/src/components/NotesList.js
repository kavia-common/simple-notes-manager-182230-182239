import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function NotesList({
  notes,
  activeId,
  onNew,
  onSelect,
  onDelete,
  query,
  onQueryChange,
}) {
  /** NotesList renders search, a New Note button, and the list of notes with preview. */

  return (
    <div className="notes-list" role="navigation" aria-label="Notes list">
      <div className="list-header">
        <div className="search">
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />
          <button className="btn btn-primary" onClick={onNew} aria-label="Create a new note">
            + New Note
          </button>
        </div>
      </div>
      <ul className="notes" role="list">
        {notes.map((n) => {
          const isActive = n.id === activeId;
          const preview =
            n.body && n.body.trim().length > 0
              ? n.body.replace(/\n/g, ' ').slice(0, 120)
              : 'No content';

        return (
            <li
              key={n.id}
              className="note-item"
              aria-selected={isActive ? 'true' : 'false'}
              onClick={() => onSelect(n.id)}
            >
              <div className="note-row">
                <div>
                  <div className="note-title">{n.title || 'Untitled'}</div>
                  <div className="note-preview">{preview}</div>
                </div>
                <div className="note-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="icon-btn"
                    onClick={() => onDelete(n.id)}
                    aria-label={`Delete note ${n.title || ''}`.trim()}
                    title="Delete note"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </li>
          );
        })}
        {notes.length === 0 && (
          <li className="note-item" aria-disabled="true">
            <div className="note-title">No notes found</div>
            <div className="note-preview">Create a new note to get started.</div>
          </li>
        )}
      </ul>
    </div>
  );
}
