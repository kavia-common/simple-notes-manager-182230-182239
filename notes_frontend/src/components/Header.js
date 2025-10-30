import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with app title 'Simple Notes', accent underline, and optional theme toggle. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="header">
      <div className="header-inner" role="banner">
        <div className="brand" aria-label="App Title">
          <div className="brand-title">Simple Notes</div>
          <div className="brand-underline" aria-hidden="true"></div>
        </div>
        <button
          className="btn btn-outline"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
