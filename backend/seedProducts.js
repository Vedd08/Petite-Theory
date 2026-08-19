"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("./src/models/Product"));
const MONGO_URI = 'mongodb+srv://petite_theory_db:ilxf6Uk1YV20xDxw@cluster0.anayego.mongodb.net/?appName=Cluster0';
const sampleProducts = [
    {
        title: 'Classic Chocolate Truffle Cake',
        description: 'Rich and decadent chocolate cake layered with dark chocolate ganache. A chocolate lover\'s absolute dream.',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
        category: 'Chocolate',
        isAvailable: true,
    },
    {
        title: 'Red Velvet Cream Cheese Cake',
        description: 'Moist red velvet sponge with a smooth and creamy cheese frosting, topped with elegant crumb dust.',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=1114&auto=format&fit=crop',
        category: 'Premium',
        isAvailable: true,
    },
    {
        title: 'Fresh Fruit Gateau',
        description: 'Light vanilla sponge loaded with seasonal fresh fruits and fluffy whipped cream.',
        price: 1100,
        imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1236&auto=format&fit=crop',
        category: 'Fruit',
        isAvailable: true,
    },
    {
        title: 'Biscoff Lotus Cheesecake',
        description: 'Creamy baked cheesecake with a crunchy Biscoff biscuit base and topped with generous Biscoff spread.',
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1170&auto=format&fit=crop',
        category: 'Cheesecakes',
        isAvailable: true,
    },
    {
        title: 'Black Forest Classic',
        description: 'Traditional German chocolate cake with rich cherry filling, whipped cream, and chocolate shavings.',
        price: 1000,
        imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1203&auto=format&fit=crop',
        category: 'Classic',
        isAvailable: true,
    },
];
const seedProducts = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        // Insert the products
        for (const p of sampleProducts) {
            await Product_1.default.create(p);
        }
        console.log('5 Sample cakes added successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Failed to seed products:', error);
        process.exit(1);
    }
};
seedProducts();
