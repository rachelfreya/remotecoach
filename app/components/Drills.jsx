import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import { addDrill, deleteDrill } from '../reducers/drills'

class Drills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      drillName: '',
      drillUrl: ''
    }
  }
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})
  save = () => {
    this.close()
    this.props.addDrill({ name: this.state.drillName, url: this.state.drillUrl })
  }
  nameChange = e => this.setState({ drillName: e.target.value })
  urlChange = e => this.setState({ drillUrl: e.target.value })

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
        onTouchTap={this.save}
      />
    ]
    const drills = this.props.drills, coach = this.props.coach
    if (coach) {
      return (
        <div>
          <GridList cellHeight={300}>
            {drills.map(drill =>
            <GridTile title={drill.name} titlePosition='top' actionIcon={<IconButton onTouchTap={() => this.props.deleteDrill(drill.id)} ><NavigationClose color="white" /></IconButton>} >
              <ReactPlayer url={drill.url} width={500} height={300} controls />
            </GridTile>
            )}
            <GridTile title='Add Video' titlePosition='top' actionIcon={<IconButton onTouchTap={this.open} ><Add color="white" /></IconButton>} >
            </GridTile>
          </GridList>
          <Dialog
            title='Add Video'
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              floatingLabelText="Drill Name"
              onChange={this.nameChange}
            /><br />
            <TextField
              floatingLabelText="URL"
              onChange={this.urlChange}
            />
          </Dialog>
        </div>
      )
    } else {
      return (
        <div>
          <GridList cellHeight={300}>
            {drills.map(drill =>
            <GridTile title={drill.name} titlePosition='top'>
              <ReactPlayer url={drill.url} width={500} height={300} controls />
            </GridTile>
            )}
          </GridList>
        </div>
      )
    }
  }
}

const mapState = ({ drills, coach }) => ({ drills, coach })

export default connect(mapState, { addDrill, deleteDrill })(Drills)
