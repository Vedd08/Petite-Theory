import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import api from '../lib/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
}

const emptyForm = {
  title: '',
  description: '',
  price: '',
  category: 'Cakes',
  isAvailable: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setMessage({ type: 'error', text: 'Could not load products. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (product: Product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      description: product.description,
      price: String(product.price),
      category: product.category,
      isAvailable: product.isAvailable,
    });
    setImageFile(null);
    setImagePreview(product.imageUrl);
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

    if (!editingId && !imageFile) {
      setMessage({ type: 'error', text: 'Please choose an image for the new product.' });
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('isAvailable', String(form.isAvailable));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Product updated.' });
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage({ type: 'success', text: 'Product added.' });
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to save product', error);
      setMessage({ type: 'error', text: error?.response?.data?.message || 'Failed to save product.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete "${product.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/products/${product._id}`);
      setMessage({ type: 'success', text: 'Product removed.' });
      if (editingId === product._id) resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product', error);
      setMessage({ type: 'error', text: 'Failed to delete product.' });
    }
  };

  return (
    <>
      <header>
        <div>
          <h1>Manage Products</h1>
          <p className="page-subtitle">{products.length} cake{products.length === 1 ? '' : 's'} in your catalog</p>
        </div>
        <button className="btn-secondary" onClick={fetchProducts}>Refresh</button>
      </header>

      {message && (
        <div className={`banner banner-${message.type}`}>{message.text}</div>
      )}

      <section className="dashboard-grid">
        <div className="card form-card" ref={formCardRef}>
          <div className="form-card-header">
            <h3>{editingId ? 'Edit Cake' : 'Add New Cake'}</h3>
            {editingId && (
              <button type="button" className="btn-link" onClick={resetForm}>Cancel edit</button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
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
                <label>Category</label>
                <input
                  type="text"
                  list="category-options"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
                <datalist id="category-options">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="form-group">
              <label>Product Image{editingId ? ' (leave empty to keep current)' : ''}</label>
              <input
                id="imageInput"
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
              {saving ? 'Saving…' : editingId ? 'SAVE CHANGES' : 'ADD PRODUCT'}
            </button>
          </form>
        </div>

        <div className="card list-card">
          <div className="list-card-header">
            <h3>Current Catalog</h3>
            <input
              type="search"
              placeholder="Search by name or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <p className="empty-state">Loading…</p>
          ) : filteredProducts.length === 0 ? (
            <p className="empty-state">
              {products.length === 0 ? 'No products yet — add your first cake!' : 'No products match your search.'}
            </p>
          ) : (
            <div className="product-list">
              {filteredProducts.map((p) => (
                <div key={p._id} className={`product-item ${p.isAvailable ? '' : 'product-item-hidden'}`}>
                  <img src={p.imageUrl} alt={p.title} className="product-thumb" />
                  <div className="product-info">
                    <h4>{p.title}</h4>
                    <div className="product-meta">
                      <span className="badge badge-category">{p.category}</span>
                      <span className={`badge ${p.isAvailable ? 'badge-available' : 'badge-hidden'}`}>
                        {p.isAvailable ? 'Available' : 'Hidden'}
                      </span>
                      <span className="product-price">₹{p.price}</span>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-edit" onClick={() => startEdit(p)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDelete(p)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
