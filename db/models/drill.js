'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('drills', {
  name: STRING,
  url: STRING
})
