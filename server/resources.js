'use strict'

const db = require('APP/db')
const Resource = db.model('resources')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Resource.findAll()
      .then(resources => res.json(resources))
      .catch(next))
  .post('/', (req, res, next) =>
      Resource.create(req.body)
      .then(resource => Resource.findAll())
      .then(resources => res.json(resources))
      .catch(next))
  .delete('/:id', (req, res, next) =>
      Resource.findById(req.params.id)
      .then(resource => resource.destroy())
      .then(() => Resource.findAll())
      .then(resources => res.json(resources))
      .catch(next))
