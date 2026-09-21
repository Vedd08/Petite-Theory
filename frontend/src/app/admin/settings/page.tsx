"use client";

import { useState } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Sidebar from '../Sidebar';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function SettingsPage() {
  const { logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await api.put('/auth/credentials', { username, password });
      setMessage({ type: 'success', text: 'Credentials updated. Please log in again.' });
      setUsername('');
      setPassword('');
      
      // Force user to log in again with new credentials
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update credentials.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="admin-container">
        <Sidebar />
        <main className="content">
          <header>
            <div>
              <h1>Account Settings</h1>
              <p className="page-subtitle">Update your admin username and password.</p>
            </div>
          </header>

          {message && (
            <div className={`banner banner-${message.type}`} style={{ marginBottom: '20px' }}>
              {message.text}
            </div>
          )}

          <div className="card form-card" style={{ maxWidth: '500px' }}>
            <div className="form-card-header">
              <h3>Change Credentials</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>New Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Updating...' : 'Update Credentials'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
