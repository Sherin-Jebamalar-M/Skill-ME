import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema({
  caption: String,
  img: {
    data: Buffer,
    contentType: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // <-- this should match your user model name
    required: true,
  }
});

export const Image = mongoose.model('Image', imageSchema);
