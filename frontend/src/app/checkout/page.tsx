"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import styles from "../page.module.css";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    specialInstructions: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Format the WhatsApp message
    let message = `*NEW ORDER - Petite थियोरी*%0A%0A`;
    
    message += `*CUSTOMER DETAILS*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    if (formData.email) message += `Email: ${formData.email}%0A`;
    message += `Delivery Date: ${formData.deliveryDate}%0A`;
    message += `Delivery Time: ${formData.deliveryTime}%0A`;
    message += `Address: ${formData.address}%0A`;
    if (formData.specialInstructions) message += `Notes: ${formData.specialInstructions}%0A`;
    
    message += `%0A*ORDER SUMMARY*%0A`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.title} (x${item.quantity}) - ₹${item.product.price * item.quantity}%0A`;
    });
    
    message += `%0A*TOTAL: ₹${getCartTotal()}*%0A`;
    
    const phone = "918866836861";
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    
    // clearCart();
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <Navbar />

        <section style={{ padding: '4rem 4rem 2rem', textAlign: 'center', backgroundColor: '#f4f4f5' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
            CHECKOUT
          </h1>
        </section>

        <section style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
          
          {/* Cart Summary (Left) */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>YOUR CART</h2>
            
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Your cart is currently empty.</p>
                <Link href="/shop" className="btn btn-filled" style={{ padding: '0.6rem 1.5rem' }}>
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cart.map(item => (
                  <div key={item.product._id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                    <img 
                      src={item.product.imageUrl || "/cakes/cake-6.png"} 
                      alt={item.product.title} 
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.product.title}</h4>
                        <span style={{ fontWeight: 700 }}>₹{item.product.price * item.quantity}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>₹{item.product.price} each</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }}
                          >-</button>
                          <span>{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer' }}
                          >+</button>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeFromCart(item.product._id)}
                          style={{ color: '#dc2626', fontSize: '0.8rem', textDecoration: 'underline', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--text-primary)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>TOTAL</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>₹{getCartTotal()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form (Right) */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '3rem', borderRadius: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>DELIVERY DETAILS</h2>
            
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Delivery Date *</label>
                  <input required type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Delivery Time *</label>
                  <input required type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Delivery Address *</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Special Instructions (Optional)</label>
                <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={2} placeholder="E.g., Write 'Happy Birthday'" style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-filled" 
                disabled={cart.length === 0}
                style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem', letterSpacing: '1px', opacity: cart.length === 0 ? 0.5 : 1, cursor: cart.length === 0 ? 'not-allowed' : 'pointer', border: 'none' }}
              >
                PLACE ORDER VIA WHATSAPP
              </button>
            </form>
          </div>

        </section>
        
        <Footer />
      </div>
    </main>
  );
}
