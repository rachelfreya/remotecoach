import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const resources = [{name: 'Freestyle', url: 'http://www.usms.org/articles/articledisplay.php?aid=1929'}, {name: 'Backstroke', url: 'http://www.swimsmooth.com/kick.html'}]

export default class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.close}
      />
    ]
    return (
      <div>
        <h1>Resources</h1>
          <ul>
            {resources.map(resource =>
            <li>
              <a href={resource.url} target="_blank" >{resource.name}</a>
            </li>
            )}
          </ul>
          <button onClick={this.open} >Add Resource</button>
          <Dialog
            title='Add Resource'
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              floatingLabelText="Resource Name"
            /><br />
            <TextField
              floatingLabelText="URL"
            />
          </Dialog>
      </div>
    )
  }
}
