'use strict'

const {STRING, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('messages', {
  name: STRING,
  text: STRING,
  read: BOOLEAN,
  weekId: INTEGER
})
