import React from 'react'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const WorkoutSelect = props => (
  <SelectField
    floatingLabelText={props.workoutName}
    value={props.workoutValue}
    onChange={props.workoutChange}
    autoWidth={true}
  >
    <MenuItem value={'-'} primaryText='None' />
    <MenuItem value={'30'} primaryText='30 minutes' />
    <MenuItem value={'60'} primaryText='60 minutes' />
    <MenuItem value={'90'} primaryText='90 minutes' />
  </SelectField>
  )

export default WorkoutSelect
