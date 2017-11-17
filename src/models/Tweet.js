import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
  text: {
    type: String,
    minlenght: [5, 'Text need to have 5 characters at least'],
    maxlength: [144, 'Text nedd to be less than 144 characters'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

TweetSchema.statics = {
  incFavoriteCount(tweetId) {
    return this.findByIdAndUpdate (tweetId, { $inc:{ favoriteCount: 1 } }, { new: true });
  },
  decFavoriteCount(tweetId) {
    return this.findByIdAndUpdate (tweetId, { $inc:{ favoriteCount: -1 } }, { new: true });
  }
}

export default mongoose.model('Tweet', TweetSchema);
