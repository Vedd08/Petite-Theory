"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import api from '../api';
import ProtectedRoute from '../ProtectedRoute';
import Sidebar from '../Sidebar';

interface Offer {
  _id: string;
  title: string;
  description?: string;
  discountLabel?: string;
  code?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

const emptyForm = {
  title: '',
  description: '',
  discountLabel: '',
  code: '',
  ctaLabel: '',
  ctaLink: '',
  startDate: '',
  endDate: '',
  isActive: true,
};

const toDateInputValue = (value?: string) => (value ? value.slice(0, 10) : '');

const getOfferStatus = (offer: Offer) => {
  if (!offer.isActive) return { label: 'Inactive', className: 'badge-hidden' };

  const now = new Date();
  if (offer.startDate && new Date(offer.startDate) > now) {
    return { label: 'Scheduled', className: 'badge-category' };
  }
  if (offer.endDate && new Date(offer.endDate) < now) {
    return { label: 'Expired', className: 'badge-hidden' };
  }
  return { label: 'Live', className: 'badge-available' };
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/offers');
      setOffers(res.data);
    } catch (error) {
      console.error('Failed to fetch offers', error);
      setMessage({ type: 'error', text: 'Could not load offers. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return offers;
    return offers.filter(
      (o) => o.title.toLowerCase().includes(q) || (o.code ?? '').toLowerCase().includes(q)
    );
  }, [offers, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (offer: Offer) => {
    setEditingId(offer._id);
    setForm({
      title: offer.title,
      description: offer.description ?? '',
      discountLabel: offer.discountLabel ?? '',
      code: offer.code ?? '',
      ctaLabel: offer.ctaLabel ?? '',
      ctaLink: offer.ctaLink ?? '',
      startDate: toDateInputValue(offer.startDate),
      endDate: toDateInputValue(offer.endDate),
      isActive: offer.isActive,
    });
    setImageFile(null);
    setImagePreview(offer.imageUrl ?? null);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      if (form.description) formData.append('description', form.description);
      if (form.discountLabel) formData.append('discountLabel', form.discountLabel);
      if (form.code) formData.append('code', form.code);
      if (form.ctaLabel) formData.append('ctaLabel', form.ctaLabel);
      if (form.ctaLink) formData.append('ctaLink', form.ctaLink);
      if (form.startDate) formData.append('startDate', form.startDate);
      if (form.endDate) formData.append('endDate', form.endDate);
      formData.append('isActive', String(form.isActive));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingId) {
        await api.put(`/offers/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Offer updated.' });
      } else {
        await api.post('/offers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Offer added.' });
      }

      resetForm();
      fetchOffers();
    } catch (error: any) {
      console.error('Failed to save offer', error);
      setMessage({ type: 'error', text: error?.response?.data?.message || 'Failed to save offer.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (offer: Offer) => {
    if (!window.confirm(`Delete "${offer.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/offers/${offer._id}`);
      setMessage({ type: 'success', text: 'Offer removed.' });
      if (editingId === offer._id) resetForm();
      fetchOffers();
    } catch (error) {
      console.error('Failed to delete offer', error);
      setMessage({ type: 'error', text: 'Failed to delete offer.' });
    }
  };

  return (
    <ProtectedRoute>
      <div className="admin-container">
        <Sidebar />
        <main className="content">
          <header>
            <div>
              <h1>Special Offers</h1>
              <p className="page-subtitle">{offers.length} offer{offers.length === 1 ? '' : 's'} configured</p>
            </div>
            <button className="btn-secondary" onClick={fetchOffers}>Refresh</button>
          </header>

          {message && (
            <div className={`banner banner-${message.type}`}>{message.text}</div>
          )}

          <section className="dashboard-grid">
            <div className="card form-card" ref={formCardRef}>
              <div className="form-card-header">
                <h3>{editingId ? 'Edit Offer' : 'Add New Offer'}</h3>
                {editingId && (
                  <button type="button" className="btn-link" onClick={resetForm}>Cancel edit</button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Diwali Special — Flat 20% Off"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description (optional)</label>
                  <textarea
                    placeholder="On all orders above ₹999. Valid till stocks last."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div className="form-group row">
                  <div>
                    <label>Discount label (optional)</label>
                    <input
                      type="text"
                      placeholder="20% OFF"
                      value={form.discountLabel}
                      onChange={(e) => setForm({ ...form, discountLabel: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Promo code (optional)</label>
                    <input
                      type="text"
                      placeholder="DIWALI20"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div>
                    <label>Button text (optional)</label>
                    <input
                      type="text"
                      placeholder="Shop Now"
                      value={form.ctaLabel}
                      onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Button link (optional)</label>
                    <input
                      type="text"
                      placeholder="/shop"
                      value={form.ctaLink}
                      onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Offer image{editingId ? ' (leave empty to keep current)' : ' (optional)'}</label>
                  <input
                    id="offerImageInput"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                </div>

                <div className="form-group row">
                  <div>
                    <label>Start date (optional)</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>End date (optional)</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  />
                  Active — show on the site
                </label>

                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editingId ? 'SAVE CHANGES' : 'ADD OFFER'}
                </button>
              </form>
            </div>

            <div className="card list-card">
              <div className="list-card-header">
                <h3>Current Offers</h3>
                <input
                  type="search"
                  placeholder="Search by title or code…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              {loading ? (
                <p className="empty-state">Loading…</p>
              ) : filteredOffers.length === 0 ? (
                <p className="empty-state">
                  {offers.length === 0 ? 'No offers yet — add your first festival sale!' : 'No offers match your search.'}
                </p>
              ) : (
                <div className="product-list">
                  {filteredOffers.map((o) => {
                    const status = getOfferStatus(o);
                    return (
                      <div key={o._id} className={`product-item ${o.isActive ? '' : 'product-item-hidden'}`}>
                        {o.imageUrl && (
                          <img src={o.imageUrl} alt={o.title} className="product-thumb" />
                        )}
                        <div className="product-info">
                          <h4>{o.title}</h4>
                          <div className="product-meta">
                            <span className={`badge ${status.className}`}>{status.label}</span>
                            {o.discountLabel && <span className="badge badge-category">{o.discountLabel}</span>}
                            {o.code && <span className="badge badge-category">Code: {o.code}</span>}
                            {(o.startDate || o.endDate) && (
                              <span className="product-price">
                                {o.startDate ? toDateInputValue(o.startDate) : '…'} → {o.endDate ? toDateInputValue(o.endDate) : '…'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="product-actions">
                          <button className="btn-edit" onClick={() => startEdit(o)}>Edit</button>
                          <button className="btn-danger" onClick={() => handleDelete(o)}>Delete</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
