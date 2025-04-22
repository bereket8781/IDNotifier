import React from 'react';

const Layout = ({ children }) => (
  <div className="app-layout">
    <header className="app-header">
      <h1>ID Notifier</h1>
    </header>
    <main className="app-content">{children}</main>
    <footer className="app-footer">
      <small>&copy; 2025 ID Notifier</small>
    </footer>
  </div>
);

export default Layout;