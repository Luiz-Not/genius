import { INCREMENT_SEQUENCE, SET_CURRENT, SET_PLAYER_SEQUENCE, RESET_PLAYER_SEQUENCE, RESET_GAME  } from "../actionTypes";

const initialState = {
  sequence: [],
  playerSequence: [],
  level: 0,
  current: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_SEQUENCE: {
      const { index } = action.payload;
      return {
        ...state,
        sequence: [...state.sequence, index],
        level: state.level + 1
      };
    }
    case SET_CURRENT: {
      const { index } = action.payload;
      return {
        ...state,
        current: index
      };
    }
    case SET_PLAYER_SEQUENCE: {
      const { index } = action.payload;
      return {
        ...state,
        playerSequence: [...state.playerSequence, index],
      };
    }
    case RESET_PLAYER_SEQUENCE: {
      return {
        ...state,
        playerSequence: []
      }
    }
    case RESET_GAME: {
      return {
        sequence: [],
        playerSequence: [],
        level: 0,
        current: null
      }
    }
    default:
      return state;
  }
}
