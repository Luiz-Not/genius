import React from 'react'
import Genius from './Genius'
import './Container.css'

export default class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Genius />
        </div>
      </div>
    )
  }
}
