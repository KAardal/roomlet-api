'use strict'

const jsonParser = require('body-parser').json()
const listingRouter = (module.exports = new require('express').Router())

const { Listing } = require('../model/listing.js')

listingRouter.post('/api/listings', jsonParser, (req, res, next) => {
  console.log(req.body)
  console.log('hit POST /api/listings')
  console.log('Listing: ', Listing)
  new Listing(req.body).save().then(listing => res.json(listing)).catch(next)
})

listingRouter.get('/api/listings/:id', (req, res, next) => {
  console.log('hit GET /api/listings/:id')
  Listing.findById(req.params.id)
    .then(listing => res.json(listing))
    .catch(next)
})

listingRouter.get('/api/listings', (req, res, next) => {
  console.log('hit /api/listings')

  let pageNumber = Number(req.query.page)
  if (!pageNumber || pageNumber < 1) pageNumber = 1
  pageNumber--

  Listing.find({})
    .sort({ title: 'asc' })
    .skip(pageNumber * 50)
    .limit(50)
    .then(listings => res.json(listings))
    .catch(next)
})

listingRouter.put('/api/listings/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/listings/:id', req.params)
  Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(listing => {
      res.json(listing)
    })
    .catch(next)
})

listingRouter.delete('/api/listings/:id', (req, res, next) => {
  console.log('hit DELETE /api/listings/:id')

  Listing.findByIdAndRemove(req.params.id)
    .then(res.sendStatus(204))
    .catch(next)
})
