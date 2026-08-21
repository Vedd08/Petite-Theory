"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import api from '../api';
import ProtectedRoute from '../ProtectedRoute';
import Sidebar from '../Sidebar';

interface Hamper {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  occasion: string;
  contents: string[];
  isAvailable: boolean;
}

const emptyForm = {
  title: '',
  description: '',
  price: '',
  occasion: 'General',
  isAvailable: true,
};

export default function HampersPage() {
  const [hampers, setHampers] = useState<Hamper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [contents, setContents] = useState<string[]>([]);
  const [contentInput, setContentInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHampers();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  const fetchHampers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/hampers');
      setHampers(res.data);
    } catch (error) {
      console.error('Failed to fetch hampers', error);
      setMessage({ type: 'error', text: 'Could not load hampers. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  const occasions = useMemo(() => {
    return Array.from(new Set(hampers.map((h) => h.occasion).filter(Boolean)));
  }, [hampers]);

  const filteredHampers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return hampers;
    return hampers.filter(
      (h) => h.title.toLowerCase().includes(q) || h.occasion.toLowerCase().includes(q)
    );
  }, [hampers, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setContents([]);
    setContentInput('');
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (hamper: Hamper) => {
    setEditingId(hamper._id);
    setForm({
      title: hamper.title,
      description: hamper.description,
      price: String(hamper.price),
      occasion: hamper.occasion,
      isAvailable: hamper.isAvailable,
    });
    setContents(hamper.contents ?? []);
    setContentInput('');
    setImageFile(null);
    setImagePreview(hamper.imageUrl);
    if (fileInputRef.current) fileInputRef.current.value = '';
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addContentItem = () => {
    const value = contentInput.trim();
    if (!value) return;
    setContents((prev) => [...prev, value]);
    setContentInput('');
  };

  const removeContentItem = (index: number) => {
    setContents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContentKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addContentItem();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!editingId && !imageFile) {
      setMessage({ type: 'error', text: 'Please choose an image for the new hamper.' });
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('occasion', form.occasion);
      formData.append('contents', JSON.stringify(contents));
      formData.append('isAvailable', String(form.isAvailable));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingId) {
        await api.put(`/hampers/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Hamper updated.' });
      } else {
        await api.post('/hampers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Hamper added.' });
      }

      resetForm();
      fetchHampers();
    } catch (error: any) {
      console.error('Failed to save hamper', error);
      setMessage({ type: 'error', text: error?.response?.data?.message || 'Failed to save hamper.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (hamper: Hamper) => {
    if (!window.confirm(`Delete "${hamper.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/hampers/${hamper._id}`);
      setMessage({ type: 'success', text: 'Hamper removed.' });
      if (editingId === hamper._id) resetForm();
      fetchHampers();
    } catch (error) {
      console.error('Failed to delete hamper', error);
      setMessage({ type: 'error', text: 'Failed to delete hamper.' });
    }
  };

  return (
    <ProtectedRoute>
      <div className="admin-container">
        <Sidebar />
        <main className="content">
          <header>
            <div>
              <h1>Manage Hampers</h1>
              <p className="page-subtitle">{hampers.length} hamper{hampers.length === 1 ? '' : 's'} in your catalog</p>
            </div>
            <button className="btn-secondary" onClick={fetchHampers}>Refresh</button>
          </header>

          {message && (
            <div className={`banner banner-${message.type}`}>{message.text}</div>
          )}

          <section className="dashboard-grid">
            <div className="card form-card" ref={formCardRef}>
              <div className="form-card-header">
                <h3>{editingId ? 'Edit Hamper' : 'Add New Hamper'}</h3>
                {editingId && (
                  <button type="button" className="btn-link" onClick={resetForm}>Cancel edit</button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Raksha Bandhan Brownie Box"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="A curated tin of our best brownies, gift-wrapped and ready to send."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group row">
                  <div>
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label>Occasion</label>
                    <input
                      type="text"
                      list="occasion-options"
                      placeholder="Raksha Bandhan"
                      value={form.occasion}
                      onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                      required
                    />
                    <datalist id="occasion-options">
                      {occasions.map((o) => (
                        <option key={o} value={o} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="form-group">
                  <label>What&apos;s inside</label>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Walnut Brownie"
                      value={contentInput}
                      onChange={(e) => setContentInput(e.target.value)}
                      onKeyDown={handleContentKeyDown}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="btn-secondary" onClick={addContentItem}>
                      Add item
                    </button>
                  </div>
                  {contents.length > 0 && (
                    <div className="product-meta">
                      {contents.map((item, index) => (
                        <span key={`${item}-${index}`} className="badge badge-category">
                          {item}
                          <button
                            type="button"
                            onClick={() => removeContentItem(index)}
                            aria-label={`Remove ${item}`}
                            style={{ marginLeft: '0.4rem', border: 'none', background: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Hamper Image{editingId ? ' (leave empty to keep current)' : ''}</label>
                  <input
                    id="hamperImageInput"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                  />
                  Available for sale
                </label>

                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'SAVE CHANGES' : 'ADD HAMPER'}
                </button>
              </form>
            </div>

            <div className="card list-card">
              <div className="list-card-header">
                <h3>Current Hampers</h3>
                <input
                  type="search"
                  placeholder="Search by name or occasion…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              {loading ? (
                <p className="empty-state">Loading…</p>
              ) : filteredHampers.length === 0 ? (
                <p className="empty-state">
                  {hampers.length === 0 ? 'No hampers yet — add your first gift box!' : 'No hampers match your search.'}
                </p>
              ) : (
                <div className="product-list">
                  {filteredHampers.map((h) => (
                    <div key={h._id} className={`product-item ${h.isAvailable ? '' : 'product-item-hidden'}`}>
                      <img src={h.imageUrl} alt={h.title} className="product-thumb" />
                      <div className="product-info">
                        <h4>{h.title}</h4>
                        <div className="product-meta">
                          <span className="badge badge-category">{h.occasion}</span>
                          <span className={`badge ${h.isAvailable ? 'badge-available' : 'badge-hidden'}`}>
                            {h.isAvailable ? 'Available' : 'Hidden'}
                          </span>
                          <span className="product-price">₹{h.price}</span>
                          {h.contents?.length > 0 && (
                            <span className="product-price">{h.contents.length} item{h.contents.length === 1 ? '' : 's'} inside</span>
                          )}
                        </div>
                      </div>
                      <div className="product-actions">
                        <button className="btn-edit" onClick={() => startEdit(h)}>Edit</button>
                        <button className="btn-danger" onClick={() => handleDelete(h)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
