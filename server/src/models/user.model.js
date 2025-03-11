import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  rating: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdDate: { type: Date, required : true },
  access: { type: String, required: false, default: 'chess-player' }
});


export const User = mongoose.model('user', userSchema);