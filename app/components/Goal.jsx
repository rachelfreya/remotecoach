import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const Goal = props => {
  const goalActions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.closeGoalEditor}
    />,
    <FlatButton
      label='Save'
      primary={true}
      onTouchTap={props.saveGoal}
    />
  ]
  return (
    <Dialog
      title={props.month}
      actions={goalActions}
      modal={true}
      open={props.goalDialog}
    >
      <TextField
        floatingLabelText='Goal'
        defaultValue={props.findGoal(props.month) ? props.findGoal(props.month).goal : ''}
        onChange={props.setGoal}
      />
    </Dialog>
  )
}

export default Goal
