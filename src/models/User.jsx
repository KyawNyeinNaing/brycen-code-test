import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Select role'],
    enum: ['Guest', 'Member', 'Staff', 'Admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
