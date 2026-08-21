"use client";

import { useAuth } from './AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { username, logout } = useAuth();

  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <img src="/logo-wordmark.png" alt="Petite थियोरी" className="sidebar-logo" />
      <nav>
        <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>Products</Link>
        <Link href="/admin/hampers" className={pathname === '/admin/hampers' ? 'active' : ''}>Hampers</Link>
        <Link href="/admin/offers" className={pathname === '/admin/offers' ? 'active' : ''}>Offers</Link>
        <Link href="/admin/settings" className={pathname === '/admin/settings' ? 'active' : ''}>Settings</Link>
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
