const functions = require('firebase-functions')
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require('./handlers/screams')

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users')

const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
app.delete('/scream/:screamId', FBAuth, deleteScream)
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
// TODO: unlike a scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(app)
