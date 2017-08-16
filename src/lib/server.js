'use strict';

import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import * as mongo from './mongo.js';
import listingRouter from '../router/listing';
import fourOhFour from '../middleware/four-oh-four.js';
import errorHandler from '../middleware/error-middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

app.use(listingRouter);

app.use(fourOhFour);
app.use(errorHandler);

const state = {
  isOn: false,
  http: null
};

export const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn) return reject(new Error('USAGE ERROR: the state is on'));
    state.isOn = true;
    mongo
      .start()
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT);
          resolve();
        });
      })
      .catch(reject);
  });
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    if (!state.isOn) return reject(new Error('USAGE ERROR: the state is off'));
    return mongo
      .stop()
      .then(() => {
        state.http.close(() => {
          console.log('__SERVER_DOWN__');
          state.isOn = false;
          state.http = null;
          resolve();
        });
      })
      .catch(reject);
  });
};
