import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import DrillDialog from './DrillDialog'

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

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  save = () => {
    this.close()
    this.props.addDrill({ name: this.state.drillName, url: this.state.drillUrl })
  }

  nameChange = e => this.setState({ drillName: e.target.value })

  urlChange = e => this.setState({ drillUrl: e.target.value })

  remove = drillId =>
    <IconButton onTouchTap={() => this.props.deleteDrill(drillId)} >
      <NavigationClose color='white' />
    </IconButton>

  player = url => <ReactPlayer url={url} width={500} height={300} controls />

  render() {
    const drills = this.props.drills,
      coach = this.props.coach,
      add = <IconButton onTouchTap={this.open} >
        <Add color='white' />
      </IconButton>
    if (coach) {
      return (
        <div>
          <GridList cellHeight={300}>
            {drills.map(drill =>
            <GridTile title={drill.name} titlePosition='top' actionIcon={this.remove(drill.id)} >
              {this.player(drill.url)}
            </GridTile>
            )}
            <GridTile title='Add Video' titlePosition='top' actionIcon={add} >
            </GridTile>
          </GridList>
          <DrillDialog urlChange={this.urlChange} nameChange={this.nameChange} save={this.save} close={this.close} open={this.state.open} />
        </div>
      )
    } else {
      return (
        <div>
          <GridList cellHeight={300}>
            {drills.map(drill =>
            <GridTile title={drill.name} titlePosition='top'>
              {this.player(drill.url)}
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
