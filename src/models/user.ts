import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
});

export const User = models.User || model('User', userSchema);