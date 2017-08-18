const Listing = require('../../src/model/listing.js')

const faker = require('faker')
const mockListing = (module.exports = {})

mockListing.createOne = () => {
  let result = {}
  return new Listing({
    userId: faker.name.findName(),
    title: faker.name.findName(),
    updating: false,
    listingCreatedOn: faker.date.past(),
    listingURL: faker.address.streetAddress(),
    verified: false,
    cost: faker.random.number(3),
    landlordPhone: faker.phone.phoneNumber(7),
    petsAllowed: false,
    nonSmoking: false,
    comment: faker.name.findName(),
    parkingSpaces: faker.random.number(6),
  })
    .save()
    .then(listing => {
      result.listing = listing
      return result
    })
}
