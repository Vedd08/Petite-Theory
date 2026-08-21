import mongoose, { Document, Schema } from 'mongoose';

export interface IHamper extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  occasion: string;
  contents: string[];
  isAvailable: boolean;
}

const hamperSchema = new Schema<IHamper>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  occasion: { type: String, required: true, default: 'General' },
  contents: { type: [String], default: [] },
  isAvailable: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Hamper = mongoose.model<IHamper>('Hamper', hamperSchema);

export default Hamper;
