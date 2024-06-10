import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String },
  updatedDate: { type: Date },
  createdDate: { type: Date },
});

export default mongoose.model('Post', postSchema);


