'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('workouts', {
  name: STRING,
  total: INTEGER,
  warmup: {type: STRING, defaultValue: '-'},
  set1: {type: STRING, defaultValue: '-'},
  set2: {type: STRING, defaultValue: '-'},
  set3: {type: STRING, defaultValue: '-'},
  cooldown: {type: STRING, defaultValue: '-'}
})
