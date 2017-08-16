import Mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  listingCreatedOn: { type: String },
  listingURL: { type: String },
  verified: { type: Boolean },
  cost: { type: Number },
  landlordPhone: { type: Number },
  petsAllowed: { type: Boolean },
  nonSmoking: { type: Boolean },
  comment: { type: String },
  parkingSpaces: { type: Number },
});

export const Listing = Mongoose.model('Listing', listingSchema);
