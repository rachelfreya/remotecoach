'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('swimmers', {
  name: STRING
})
