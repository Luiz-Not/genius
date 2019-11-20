import React from 'react'
import './Genius.css'
import { connect } from 'react-redux'
import { playSound, incrementSequence, setPlayerSequence } from '../redux/actions'
import { getCurrent, getLevel } from '../redux/selectors'

class Genius extends React.Component {
  clickHandle = index => {
    const { current, level, playSound, setPlayerSequence } = this.props
    if (!level && current === null) {
      playSound(index)
    } else if (level && current === null) {
      setPlayerSequence(index)
      playSound(index)
    }
  }

  render() {
    const { incrementSequence, current, level } = this.props

    return (
      <div className="genius">
        <div className={`genius-button red ${current === 0 ? 'hover' : ''}`} onClick={() => this.clickHandle(0)}></div>
        <div className={`genius-button green ${current === 1 ? 'hover' : ''}`} onClick={() => this.clickHandle(1)}></div>
        <div className={`genius-button blue ${current === 2 ? 'hover' : ''}`} onClick={() => this.clickHandle(2)}></div>
        <div className={`genius-button yellow ${current === 3 ? 'hover' : ''}`} onClick={() => this.clickHandle(3)}></div>
        <div className="genius-actions">
          {level === 0 && <button onClick={incrementSequence}>play</button>}
          {level > 0 && <div>nivel {level}</div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current: getCurrent(state),
  level: getLevel(state)
})

export default connect(
  mapStateToProps,
  { playSound, incrementSequence, setPlayerSequence }
)(Genius)
