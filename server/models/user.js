import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  telegramId: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
