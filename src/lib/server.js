'use strict'

import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import * as mongo from './mongo.js'
import listingRouter from '../router/listing'
import fourOhFour from '../middleware/four-oh-four.js'
import errorHandler from '../middleware/error-middleware.js'

const app = express()

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://kyleaardal.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://roomletapi/',
  issuer: 'https://kyleaardal.auth0.com/',
  algorithms: ['RS256'],
})

app.use(morgan('dev'))
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
)

app.use(jwtCheck)

app.use(listingRouter)

app.use(fourOhFour)
app.use(errorHandler)

const state = {
  isOn: false,
  http: null,
}

export const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn) return reject(new Error('USAGE ERROR: the state is on'))
    state.isOn = true
    mongo
      .start()
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT)
          resolve()
        })
      })
      .catch(reject)
  })
}

export const stop = () => {
  return new Promise((resolve, reject) => {
    if (!state.isOn) return reject(new Error('USAGE ERROR: the state is off'))
    return mongo
      .stop()
      .then(() => {
        state.http.close(() => {
          console.log('__SERVER_DOWN__')
          state.isOn = false
          state.http = null
          resolve()
        })
      })
      .catch(reject)
  })
}
