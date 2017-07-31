import React from 'react'
import { connect } from 'react-redux'

import Main from './Main'
import SelectDates from './SelectDates'

const Home = props => (
  props.weeks.length ? <Main /> : <SelectDates />
)

const mapState = ({ weeks }) => ({ weeks })

export default connect(mapState, null)(Home)
