'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('resources', {
  name: STRING,
  url: STRING
})
