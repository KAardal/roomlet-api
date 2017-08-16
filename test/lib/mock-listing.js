const Listing = require('../../src/model/listing.js');

const faker = require('faker');
const mockListing = (module.exports = {});

mockListing.createOne = () => {
  let result = {};
  return new Listing({
    userId: faker.Internet.user_name(),
    name: faker.Seinfeld.character(),
    listingCreatedOn: faker.Date(),
    listingURL: faker.Address.street_name(),
    verified: false,
    cost: faker.Number.number(3),
    landlordPhone: faker.PhoneNumber.phone_number(),
    petsAllowed: false,
    nonSmoking: false,
    comment: faker.Seinfeld.quote(),
    parkingSpaces: faker.Number.number(6),
  })
    .save()
    .then(listing => {
      result.listing = listing;
      return result;
    });
};
