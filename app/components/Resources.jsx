import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'

export default class Drills extends Component {
  render() {
    return (
      <GridList>
        <GridTile title='catchup'>
          <img src={'https://i.ytimg.com/vi/dVIQ99Ywcck/maxresdefault.jpg'} />
        </GridTile>
      </GridList>
    )
  }
}
