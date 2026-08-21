import mongoose, { Document, Schema } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  description?: string;
  discountLabel?: string;
  code?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

const offerSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String },
  discountLabel: { type: String },
  code: { type: String },
  imageUrl: { type: String },
  ctaLabel: { type: String },
  ctaLink: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Offer = mongoose.model<IOffer>('Offer', offerSchema);

export default Offer;
