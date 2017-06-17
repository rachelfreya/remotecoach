'use strict'

const db = require('APP/db')
const Week = db.model('weeks')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Week.findAll({
        order: [
          ['id', 'ASC']
        ]
      })
      .then(weeks => res.json(weeks))
      .catch(next))
  .post('/', (req, res, next) =>
      Week.bulkCreate(req.body)
      .then(() => Week.findAll())
      .then(weeks => res.json(weeks))
      .catch(next))
  .post('/add', (req, res, next) =>
      Week.create(req.body)
      .then(week => res.json(week))
      .catch(next))
  .put('/:id', (req, res, next) =>
      Week.findById(req.params.id)
      .then(week => week.update(req.body))
      .then(week => Week.findAll({
        order: [
          ['id', 'ASC']
        ]
      }))
      .then(weeks => res.json(weeks))
      .catch(next))
  .delete('/:id', (req, res, next) =>
      Week.findById(req.params.id)
      .then(week => week.destroy())
      .then(() => Week.findAll({
        order: [
          ['id', 'ASC']
        ]
      }))
      .then(weeks => res.json(weeks))
      .catch(next))