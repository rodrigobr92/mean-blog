import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String },
  updatedDate: { type: Date },
  createdDate: { type: Date, default: Date.now },
})

export default mongoose.model('Post', postSchema);