import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false,
}

const dataReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: actions.payload,
        loading: false,
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === actions.payload.id
      )
      state.screams[index] = actions.payload
      return {
        ...state,
      }
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === actions.payload
      )
      state.screams.splice(index, 1)
      return {
        ...state,
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [actions.payload, ...state.screams],
      }
    default:
      return state
  }
}

export default dataReducer
