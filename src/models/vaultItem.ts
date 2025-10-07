import { Schema, model, models } from 'mongoose';

const vaultSchema = new Schema({
  userId: String,
  title: String,
  username: String,
  password: String, // encrypted
  url: String,
  notes: String,
});

export const VaultItem = models.VaultItem || model('VaultItem', vaultSchema);