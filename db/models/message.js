'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('messages', {
  name: STRING,
  text: STRING,
  week: STRING
})
