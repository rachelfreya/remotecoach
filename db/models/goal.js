'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('goals', {
  month: STRING,
  goal: STRING
})
