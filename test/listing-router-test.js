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
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          console.log(res.body, 'this is the body!!')
          expect(res.body).toExist()
          expect(res.body.title).toEqual('sup')
        })
    })

    it('should return a 409', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
              userId: '345345',
              title: 'sup',
              updating: false,
              listingCreatedOn: new Date(),
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

    it('should return a 400 for a bad request', () => {
      return superagent.post(`${API_URL}/api/listings`).catch(res => {
        console.log('this is the response!!!', res.status)
        expect(res.status).toEqual(400)
      })
    })
  })

  describe('testing GET /api/listings', () => {
    it('should return a 200, listing', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          console.log(res.body, 'this is the repsonse!!!')
          tempListing = res.body
          return superagent.get(
            `${API_URL}/api/listings/?${tempListing.userId.toString()}`
          )
        })
        .catch(res => {
          console.log(res.status, 'here is the status!!!')
          expect(res).toExist()
          expect(res.status).toEqual(200)
        })
    })
    it('should return a 200, return all listings!!', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          console.log(res.body, 'this is the repsonse!!!')
          tempListing = res.body
          return superagent.get(`${API_URL}/api/listings`)
        })
        .catch(res => {
          console.log(res.status, 'here is the status!!!')
          expect(res).toExist()
          expect(res.status).toEqual(200)
        })
    })
    it('should return a cast to object id, 404 error', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          tempListing = res.body
          tempListing.userId = 'wrong id!!'
          return superagent.get(
            `${API_URL}/api/listings/?${tempListing.userId.toString()}`
          )
        })
        .catch(res => {
          expect(res.status).toEqual(404)
        })
    })
    it('should return a cast to object id, 404 error', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          tempListing = res.body
          tempListing.userId = 'wrong id!!'
          return superagent.get(
            `${API_URL}/api/listingssdfdf/?${tempListing.userId.toString()}`
          )
        })
        .catch(res => {
          expect(res.status).toEqual(404)
        })
    })
    it('should return a cast to object id, 404 error', () => {
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
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
          tempListing = res.body
          return superagent.get(
            `${API_URL}/api/listings/?${tempListing.userId.toString()}`
          )
        })
        .catch(res => {
          expect(res.status).toEqual(404)
        })
    })
  })
  describe('testing PUT /api/listings', () => {
    it('should respond with the updated listing', () => {
      let tempListing, tempUser
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
          listingURL: '34tegegegre',
          verified: false,
          cost: 345345,
          landlordPhone: 345345,
          petsAllowed: false,
          nonSmoking: false,
          comment: 'sup',
          parkingSpaces: 2,
        })
        .then(result => {
          tempListing = result.body
          return superagent
            .put(`${API_URL}/api/listings/${tempListing._id.toString()}`)
            .send({ title: 'updated' })
        })
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.title).toEqual('updated')
        })
    })
    it('should send over a 404 error', () => {
      let tempListing, tempUser
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
          listingURL: '34tegegegre',
          verified: false,
          cost: 345345,
          landlordPhone: 345345,
          petsAllowed: false,
          nonSmoking: false,
          comment: 'sup',
          parkingSpaces: 2,
        })
        .then(result => {
          tempListing = result.body
          tempListing._id = 'fakeid!!'
          return superagent
            .put(`${API_URL}/api/listings/${tempListing._id.toString()}`)
            .send({ description: 'updated' })
        })
        .catch(res => {
          expect(res.status).toEqual(404)
        })
    })
  })

  describe('testing the Delete route', () => {
    it('should delete the listing put into the database...', () => {
      let tempListing, tempUser
      return superagent
        .post(`${API_URL}/api/listings`)
        .send({
          userId: '345345',
          title: 'sup',
          updating: false,
          listingCreatedOn: new Date(),
          listingURL: '34tegegegre',
          verified: false,
          cost: 345345,
          landlordPhone: 345345,
          petsAllowed: false,
          nonSmoking: false,
          comment: 'sup',
          parkingSpaces: 2,
        })
        .then(result => {
          tempListing = result.body
          return superagent
            .delete(`${API_URL}/api/listings/${tempListing._id.toString()}`)
            .send()
        })
        .then(res => {
          expect(res.status).toEqual(204)
        })
    })
  })
})
