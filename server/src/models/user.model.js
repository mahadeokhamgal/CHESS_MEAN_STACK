import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  rating: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


export const User = mongoose.model('user', userSchema);