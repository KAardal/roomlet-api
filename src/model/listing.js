import Mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
  userId: { type: String },
  title: { type: String },
  updating: { type: Boolean, default: false },
  listingCreatedOn: { type: Date, default: new Date() },
  listingURL: { type: String },
  verified: { type: Boolean, default: false },
  cost: { type: Number },
  landlordPhone: { type: Number },
  petsAllowed: { type: Boolean },
  nonSmoking: { type: Boolean },
  comment: { type: String },
  parkingSpaces: { type: Number }
});

export const Listing = Mongoose.model('Listing', listingSchema);
