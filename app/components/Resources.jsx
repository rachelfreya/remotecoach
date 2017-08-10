import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Trash from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

import AddResource from './AddResource'

import { addResource, deleteResource } from '../reducers/resources'
import { button } from '../utils'

const trash = <Trash />

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

  delete = id => button(this.props.deleteResource, trash, id)

  render() {
    const resources = this.props.resources, coach = this.props.coach
    return (
      <div>
        <h1>Resources</h1>
          <ul>
            {resources.map(resource =>
            <li>
              <a href={resource.url} target="_blank" >{resource.name}</a>
              {coach && button()}
            </li>
            )}
          </ul>
          {coach && <button onClick={this.open} >Add Resource</button> }
          <AddResource close={this.close} save={this.save} changeName={this.changeName} changeUrl={this.changeUrl} open={this.state.open} />
      </div>
    )
  }
}

const mapState = ({ resources, coach }) => ({ resources, coach })

export default connect(mapState, { addResource, deleteResource })(Resources)
