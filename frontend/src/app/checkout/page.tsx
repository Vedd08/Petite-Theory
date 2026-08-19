"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/shared/PageHeader";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, getCartTotal, removeFromCart, updateQuantity } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    specialInstructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

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
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const inputClass =
    "w-full rounded-xl border border-[#ecdde1] bg-white px-4 py-3 font-body text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#a99098] focus:border-[#e0186f]";
  const labelClass = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-[#5b4048]";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#1a1a1a]">
      <PageHeader
        eyebrow="Almost there"
        title="Checkout"
        subtitle="Review your order below, then send it our way — we'll confirm everything over WhatsApp."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <section className="grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Cart Summary */}
          <div>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#6d1130]">Your cart</h2>

            {cart.length === 0 ? (
              <div className="rounded-3xl bg-[#faf0f2] px-6 py-14 text-center">
                <ShoppingBag className="mx-auto mb-4 text-[#c98a9c]" size={32} strokeWidth={1.4} />
                <p className="mb-5 font-body text-sm text-[#5b4048]">Your cart is currently empty.</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-[#e0186f] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex gap-4 rounded-2xl bg-[#faf0f2] p-3">
                    <img
                      src={item.product.imageUrl || "/cakes/cake-6.png"}
                      alt={item.product.title}
                      className="size-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-base font-semibold leading-tight text-[#1a1a1a]">
                          {item.product.title}
                        </h4>
                        <span className="shrink-0 font-body text-sm font-semibold text-[#6d1130]">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                      <p className="mt-0.5 font-body text-xs text-[#8a6a75]">₹{item.product.price} each</p>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full bg-white px-1 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="grid size-6 place-items-center rounded-full text-[#6d1130] transition-colors hover:bg-[#fbe3e6]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-[1.25rem] text-center font-body text-xs font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="grid size-6 place-items-center rounded-full text-[#6d1130] transition-colors hover:bg-[#fbe3e6]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product._id)}
                          aria-label="Remove item"
                          className="grid size-7 place-items-center rounded-full text-[#b3475c] transition-colors hover:bg-[#fbe3e6]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-2 flex items-center justify-between border-t border-[#1a1a1a]/10 pt-4">
                  <span className="font-display text-lg font-semibold text-[#1a1a1a]">Total</span>
                  <span className="font-display text-lg font-semibold text-[#6d1130]">₹{getCartTotal()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <div className="rounded-[2rem] bg-[#fbe3e6]/40 p-6 sm:p-10">
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#6d1130]">Delivery details</h2>

            <form onSubmit={handleCheckout} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Delivery date *</label>
                  <input required type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Delivery time *</label>
                  <input required type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Delivery address *</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className={`${inputClass} resize-y`} />
              </div>

              <div>
                <label className={labelClass}>Special instructions (optional)</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={2}
                  placeholder="E.g., Write 'Happy Birthday'"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#e0186f] py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <WhatsAppIcon size={16} /> Place order via WhatsApp
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
