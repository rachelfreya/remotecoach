import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const drills = [{name: 'Catchup', url: 'https://www.youtube.com/watch?v=GUULNJEdKU8'}, {name: 'Fingertip drag', url: 'https://www.youtube.com/watch?v=3mBb2djmdv0'}]

export default class Drills extends Component {
  render() {
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
