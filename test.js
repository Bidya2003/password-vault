import mongoose from "mongoose";

const uri = "mongodb+srv://passwordVault:PassVau0710@cluster0.e85xh.mongodb.net/passwordVaultDB?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));
