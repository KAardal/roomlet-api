require('dotenv').config({ path: `${__dirname}/../.test.env` })
require('babel-register')
const expect = require('expect')
const superagent = require('superagent')

const server = require('../src/lib/server.js')
const cleanDB = require('./lib/clean-db.js')
const mockListing = require('./lib/mock-listing.js')

let API_URL = process.env.API_URL

describe('testing listing router', () => {
  before(server.start)
  after(server.stop)
  // afterEach(cleanDB);
  let tempListing

  describe('testing POST /api/listings', () => {
    it('should return a 200', () => {
      let testListingData
      // let listingOne = mockListing.createOne()

      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: 'sup',
          name: 'sup',
          listingCreatedOn: 'sup',
          listingURL: '34tegegegre',
          verified: false,
          cost: 345345,
          landlordPhone: 345345,
          petsAllowed: false,
          nonSmoking: false,
          comment: 'sup',
          parkingSpaces: 2,
        })
        .then(res => {
          expect(res.body).toExist()
          expect(res.body.name).toEqual('sup')
        })
    })

    it('should return a 409', () => {
      return mockListing.createOne().then(listingData => {
        testListingData = listingData
        return superagent
          .post(`${API_URL}/api/listings`)
          .send({
            userId: 'sup',
            name: 'sup',
            listingCreatedOn: 'sup',
            listingURL: '34tegegegre',
            verified: false,
            cost: 345345,
            landlordPhone: 345345,
            petsAllowed: false,
            nonSmoking: false,
            comment: 'sup',
            parkingSpaces: 2,
          })
          .then(() => {
            return superagent
              .post(`${API_URL}/api/listings`)
              .send({
                userId: 'sup',
                name: 'sup',
                listingCreatedOn: 'sup',
                listingURL: '34tegegegre',
                verified: false,
                cost: 345345,
                landlordPhone: 345345,
                petsAllowed: false,
                nonSmoking: false,
                comment: 'sup',
                parkingSpaces: 2,
              })
              .catch(res => {
                expect(res.status).toEqual(409)
              })
          })
      })
    })

    it('should return a 400 for a bad request', () => {
      return superagent.post(`${API_URL}/api/listings`).catch(res => {
        console.log('this is the response!!!', res.status)
        expect(res.status).toEqual(400)
      })
    })
  })

  describe('testing GET /api/listings', () => {
    it('should return a 200, listing', () => {
      return mockListing
        .createOne()
        .then(res => {
          tempListing = res.listing
          return superagent.get(
            `${API_URL}/api/burgers/${tempListing._id.toString()}`
          )
        })
        .catch(res => {
          expect(res).toExist()
          expect(res.status).toEqual(200)
        })
    })
    it('should return a cast to object id, 404 error', () => {
      return mockListing
        .createOne()
        .then(res => {
          tempListing = res.listing
          return superagent.get(
            `${API_URL}/api/listings/${tempListing.name.toString()}`
          )
        })
        .catch(res => {
          expect(res.status).toEqual(404)
        })
    })
  })
})

// describe('')
