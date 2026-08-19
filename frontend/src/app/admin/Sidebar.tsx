"use client";

import { useAuth } from './AuthContext';

export default function Sidebar() {
  const { username, logout } = useAuth();

  return (
    <aside className="sidebar">
      <img src="/logo-wordmark.png" alt="Petite थियोरी" className="sidebar-logo" />
      <nav>
        <a href="#" className="active">Products</a>
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-user">
          Signed in as <strong>{username ?? '…'}</strong>
        </p>
        <button className="btn-logout" onClick={logout}>Log out</button>
      </div>
    </aside>
  );
}
