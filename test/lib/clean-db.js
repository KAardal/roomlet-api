const listing = require('../../src/model/listing.js');

module.exports = () => {
  return Promise.all([listing.remove({})]);
};
