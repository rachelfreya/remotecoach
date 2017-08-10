import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const EditWorkout = props => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.close}
    />,
    <FlatButton
      label='Save'
      primary={true}
      type='submit'
      form='edit'
    />
  ]

  const setValue = property => property === '-' ? '' : property

  const workout = props.workout

  return (
    <Dialog
      title='Edit Workout'
      actions={actions}
      modal={true}
      open={props.open}
      autoScrollBodyContent={true}
    >
      <form id='edit' onSubmit={props.save}>
        <TextField
          floatingLabelText='Warm Up'
          defaultValue={setValue(workout.warmup)}
          name='warmup'
          rows={2}
        /><br />
        <TextField
          floatingLabelText='Set #1'
          defaultValue={setValue(workout.set1)}
          name='set1'
          rows={4}
        /><br />
        <TextField
          floatingLabelText='Set #2'
          defaultValue={setValue(workout.set2)}
          name='set2'
          rows={4}
        /><br />
        <TextField
          floatingLabelText='Set #3'
          defaultValue={setValue(workout.set3)}
          name='set3'
          rows={4}
        /><br />
        <TextField
          floatingLabelText='Cool Down'
          defaultValue={setValue(workout.cooldown)}
          name='cooldown'
          rows={2}
        /><br />
        <TextField
          floatingLabelText='Total Yards'
          defaultValue={workout.total}
          name='total'
        />
      </form>
    </Dialog>
  )
}

export default EditWorkout
