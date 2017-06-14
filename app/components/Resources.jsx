import React, { Component } from 'react'

const resources = [{name: 'Freestyle', url: 'http://www.usms.org/articles/articledisplay.php?aid=1929'}, {name: 'Backstroke', url: 'http://www.swimsmooth.com/kick.html'}]

export default class Resources extends Component {
  render() {
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
      </div>
    )
  }
}
