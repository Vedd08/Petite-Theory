const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5000/api/products';
const CAKES_DIR = path.join(__dirname, '../frontend/public/cakes');

const newProducts = [
  { title: "Elegant Strawberry", description: "A perfect soft pink celebration cake.", price: 30, category: "Premium", image: "cake-1.png" },
  { title: "Classic Vanilla", description: "Simple but perfect.", price: 20, category: "Cakes", image: "cake-2.png" },
  { title: "Berry Delight", description: "Fresh berries on top.", price: 25, category: "Cakes", image: "cake-3.png" },
  { title: "Choco Lava", description: "Rich chocolate filling.", price: 30, category: "Premium", image: "cake-4.png" },
  { title: "Red Velvet", description: "Smooth cream cheese texture.", price: 28, category: "Cakes", image: "cake-5.png" },
  { title: "Lemon Zest", description: "Zesty and fresh celebration cake.", price: 22, category: "Cakes", image: "cake-6.png" },
  { title: "Caramel Crunch", description: "Sweet, crunchy, and irresistible.", price: 35, category: "Premium", image: "cake-7.png" },
  { title: "Mocha Dream", description: "Coffee infused perfection.", price: 28, category: "Cakes", image: "cake-8.png" },
  { title: "Pistachio Rose", description: "Delicate and floral.", price: 32, category: "Premium", image: "cake-9.png" },
  { title: "Funfetti Celebration", description: "Colorful and fun.", price: 24, category: "Cakes", image: "cake-10.png" }
];

async function seed() {
  try {
    // 1. Fetch existing products
    const res = await axios.get(API_URL);
    const existing = res.data;

    // 2. Delete all existing products
    console.log(`Deleting ${existing.length} existing products...`);
    for (const p of existing) {
      await axios.delete(`${API_URL}/${p._id}`);
      console.log(`Deleted ${p.title}`);
    }

    // 3. Add new products with image uploads
    console.log(`Adding ${newProducts.length} new products via multipart form upload...`);
    for (const p of newProducts) {
      const form = new FormData();
      form.append('title', p.title);
      form.append('description', p.description);
      form.append('price', p.price.toString());
      form.append('category', p.category);
      
      const imagePath = path.join(CAKES_DIR, p.image);
      if (fs.existsSync(imagePath)) {
        form.append('image', fs.createReadStream(imagePath));
      } else {
        console.warn(`Image not found for ${p.title}: ${imagePath}`);
      }

      await axios.post(API_URL, form, {
        headers: form.getHeaders()
      });
      console.log(`Added ${p.title}`);
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error(err);
  }
}

seed();
