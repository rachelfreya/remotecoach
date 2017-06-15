'use strict'

const db = require('APP/db')
const Goal = db.model('goals')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Goal.findAll()
      .then(goals => res.json(goals))
      .catch(next))
  .post('/', (req, res, next) =>
      Goal.findOne({where:
        { month: req.body.month }
      })
      .then(goal => (
        goal ? goal.update(req.body) : Goal.create(req.body)
      ))
      .then(goal => Goal.findAll())
      .then(goals => res.json(goals))
      .catch(next))
