import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
}

const adminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true,
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
