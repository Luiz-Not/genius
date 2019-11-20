import { INCREMENT_SEQUENCE, SET_CURRENT, SET_PLAYER_SEQUENCE, RESET_PLAYER_SEQUENCE, RESET_GAME } from "./actionTypes";
import { getSequence, getPlayerSequence, getLevel } from "./selectors"
import Sound from '../Sound'

const soundArray = [659.25, 587.33, 739.99, 880, 261.63, 246.94, 220.00]

export const playSequence = () => (dispatch, getState) => {
  const state = getState()
  const sequence = getSequence(state)

  sequence.forEach(async (value, index) => {
    await new Promise(resolve => {
      setTimeout(function() {
        dispatch(playSound(value))
        dispatch({
          type: SET_CURRENT,
          payload: {
            index: value
          }
        })

        if (sequence.length === index + 1) {
          resolve()
        }
      }, 1000 * index)
    })
    
    setTimeout(function() {
      dispatch({
        type: SET_CURRENT,
        payload: {
          index: null
        }
      })
    }, 1000)
  })
}

export const incrementSequence = () => async (dispatch) => {
  const index = getRandomInt()

  await dispatch({
    type: INCREMENT_SEQUENCE,
    payload: {
      index
    }
  })

  dispatch(playSequence())
}

export const setPlayerSequence = index => async (dispatch, getState) => {
  await dispatch({
    type: SET_PLAYER_SEQUENCE,
    payload: {
      index
    }
  })

  const state = getState()
  const sequence = getSequence(state)
  const playerSequence = getPlayerSequence(state)

  const correct = playerSequence.every((val, i) => val === sequence[i])

  if (!correct) {
    const level = getLevel(state)
    dispatch(errorSound())
    dispatch({ type: RESET_GAME })
    setTimeout(function(){ alert(`Parabéns, você chegou ao nível ${level}`) }, 1000)
    // )
  } else if (correct && sequence.length === playerSequence.length) {
    setTimeout(() => {
      dispatch(incrementSequence())
      dispatch({ type: RESET_PLAYER_SEQUENCE })
    }, 1500);
  }
}

export const errorSound = () => (dispatch) => {
  dispatch(playSound(4))
  setTimeout(function(){ dispatch(playSound(5)) }, 500)
  setTimeout(function(){ dispatch(playSound(6)) }, 1000)
}

export const playSound = index => () => {
  Sound.play(soundArray[index]);
  Sound.stop();
}

const getRandomInt = (max = 4) => {
  return Math.floor(Math.random() * Math.floor(max));
}
