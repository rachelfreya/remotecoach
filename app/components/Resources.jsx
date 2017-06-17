import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Trash from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

import { addResource, deleteResource } from '../reducers/resources'

const coach = true

class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      url: ''
    }
  }
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})
  changeName = e => this.setState({ name: e.target.value })
  changeUrl = e => this.setState({ url: e.target.value })
  save = () => {
    this.close()
    this.props.addResource({ name: this.state.name, url: this.state.url })
  }
  render() {
    const resources = this.props.resources
    console.log('RESOURCES', resources)
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.save}
      />
    ]
    return (
      <div>
        <h1>Resources</h1>
          <ul>
            {resources.map(resource =>
            <li>
              <a href={resource.url} target="_blank" >{resource.name}</a>
              {coach ? <IconButton onTouchTap={() => this.props.deleteResource(resource.id)} ><Trash /></IconButton> : null}
            </li>
            )}
          </ul>
          {coach ? <button onClick={this.open} >Add Resource</button> : null}
          <Dialog
            title='Add Resource'
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              floatingLabelText="Resource Name"
              onChange={this.changeName}
            /><br />
            <TextField
              floatingLabelText="URL"
              onChange={this.changeUrl}
            />
          </Dialog>
      </div>
    )
  }
}

const mapState = ({ resources }) => ({ resources })

export default connect(mapState, { addResource, deleteResource })(Resources)
