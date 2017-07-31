import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DrillDialog = props => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.close}
    />,
    <FlatButton
      label='Save'
      primary={true}
      onTouchTap={props.save}
    />
  ]
  return (
    <Dialog
      title='Add Video'
      actions={actions}
      modal={true}
      open={props.open}
    >
      <TextField
        floatingLabelText='Drill Name'
        onChange={props.nameChange}
      /><br />
      <TextField
        floatingLabelText='URL'
        onChange={props.urlChange}
      />
    </Dialog>
  )
}

export default DrillDialog
