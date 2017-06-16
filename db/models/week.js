'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('weeks', {
  date: STRING,
  workout1: {type: STRING, defaultValue: '-'},
  workout2: {type: STRING, defaultValue: '-'},
  workout3: {type: STRING, defaultValue: '-'},
  ows: {type: STRING, defaultValue: '-'}
})
