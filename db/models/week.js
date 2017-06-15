'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('weeks', {
  date: STRING,
  workout1: INTEGER,
  workout2: INTEGER,
  workout3: INTEGER,
  ows: STRING
})
