import React from 'react'

import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import WorkoutSelect from './WorkoutSelect'

const Week = props => {
  const weekActions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.closeWeekEditor}
    />,
    <FlatButton
      label='Save'
      primary={true}
      onTouchTap={props.saveWorkout}
    />
  ]
  return (
    <Dialog
      title={`Week of ${props.week}`}
      actions={weekActions}
      modal={true}
      open={props.weekDialog}
    >
      <WorkoutSelect workoutName='Workout 1' workoutValue={props.workout1} workoutChange={props.workout1Change} /><br />
      <WorkoutSelect workoutName='Workout 2' workoutValue={props.workout2} workoutChange={props.workout2Change} /><br />
      <WorkoutSelect workoutName='Workout 3' workoutValue={props.workout3} workoutChange={props.workout3Change} /><br />
      <TextField
        floatingLabelText='Open Water Swims'
        defaultValue={props.ows === '-' ? '' : props.ows}
        onChange={props.owsChange}
      />
    </Dialog>
  )
}

export default Week
