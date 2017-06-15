'use strict'

const db = require('APP/db')
const Workout = db.model('workouts')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
      Workout.findAll()
      .then(workouts => res.json(workouts))
      .catch(next))
  .post('/', (req, res, next) =>
      Workout.create(req.body)
      .then(workout => res.status(201).json(workout))
      .catch(next))
  .get('/:id', (req, res, next) =>
      Workout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(next))
  .put('/:id', (req, res, next) =>
      Workout.findById(req.params.id)
      .then(workout => workout.update(req.body))
      .then(workout => res.json(workout))
      .catch(next))
  .delete('/:id', (req, res, next) =>
      Workout.findById(req.params.id)
      .then(workout => workout.destroy())
      .catch(next))
