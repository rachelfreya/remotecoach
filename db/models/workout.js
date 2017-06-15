'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('workouts', {
  name: STRING,
  total: STRING,
  warmup: STRING,
  set1: STRING,
  set2: STRING,
  set3: STRING,
  cooldown: STRING
})
