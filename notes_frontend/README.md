# Simple Notes – React Frontend

A lightweight React app to create, edit, duplicate, search, and delete notes. All data is stored locally in your browser using localStorage. No backend is required.

## Features

- Create new notes
- Edit note title and body (autosaves as you type)
- Duplicate existing notes
- Delete notes (with confirmation)
- Search across titles and bodies
- Notes are sorted by most recently updated
- Data persists in your browser via localStorage
- Light/Dark theme toggle

## Getting Started

In the project directory:

### `npm install`
Install dependencies.

### `npm start`
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

### `npm test`
Runs the tests in watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## How to Use

- Create: Click “+ New Note” from the left panel or from the empty state.
- Edit: Update the Title and Body in the editor on the right. Changes are autosaved.
- Save: A Save button is available for reassurance, but autosave is active.
- Duplicate: Click “⎘ Duplicate” to create a copy of the current note.
- Delete: Click “🗑 Delete” in the editor, or the trash icon from the list. A confirmation will appear.
- Search: Use the search box above the list to filter by title or body content.

## Data Persistence

- Notes and the selected note id are saved in localStorage using keys:
  - `notes.v1`
  - `notes.selectedId.v1`
- Clearing your browser storage or switching browsers/devices will reset the notes.

## Project Structure

- `src/App.js` – Main application logic and state
- `src/components/NotesList.js` – Notes list with search and new note button
- `src/components/NoteEditor.js` – Editor for title/body with actions
- `src/components/Header.js` – App header with theme toggle
- `src/hooks/useLocalStorage.js` – Hook for localStorage persistence
- `src/utils/id.js` – Utility for generating unique ids
- `src/App.css` – App styles
- `src/index.css` – Base styles

## Notes

- This app is fully frontend-only. There are no network requests or backend references.
- You can safely embed or deploy as a static site.
