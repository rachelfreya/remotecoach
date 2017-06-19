'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('messages', {
  name: STRING,
  text: STRING,
  weekId: INTEGER
})
