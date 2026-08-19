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
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <div className="admin-header">
            <h2>Account Settings</h2>
            <p>Update your admin username and password.</p>
          </div>

          {message && (
            <div className={`alert alert-${message.type}`} style={{ marginBottom: '20px' }}>
              {message.text}
            </div>
          )}

          <div className="admin-card">
            <form onSubmit={handleSubmit} className="admin-form">
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
