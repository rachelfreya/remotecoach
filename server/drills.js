'use strict'

const db = require('APP/db')
const Drill = db.model('drills')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Drill.findAll()
      .then(drills => res.json(drills))
      .catch(next))
  .post('/', (req, res, next) =>
      Drill.create(req.body)
      .then(drill => Drill.findAll())
      .then(drills => res.json(drills))
      .catch(next))
  .delete('/:id', (req, res, next) =>
      Drill.findById(req.params.id)
      .then(drill => drill.destroy())
      .then(() => Drill.findAll())
      .then(drills => res.json(drills))
      .catch(next))
