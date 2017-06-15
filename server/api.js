'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/workouts', require('./workouts'))
  .use('/messages', require('./messages'))
  .use('/weeks', require('./weeks'))
  .use('/drills', require('./drills'))
  .use('/resources', require('./resources'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
