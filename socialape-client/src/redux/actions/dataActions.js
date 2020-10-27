import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_ERRORS,
} from '../types'

import axios from 'axios'

//get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      })
    })
}

//like a scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err => console.error(err))
}

//unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err => console.error(err))
}
