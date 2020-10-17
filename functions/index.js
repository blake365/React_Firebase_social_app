const functions = require('firebase-functions')
const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage } = require('./handlers/users')
const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// scream routes
app.get('/screams', getAllScreams)
//post a scream
app.post('/scream', FBAuth, postOneScream)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.https.onRequest(app)
