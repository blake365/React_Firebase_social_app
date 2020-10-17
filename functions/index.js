const functions = require('firebase-functions')
const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login } = require('./handlers/users')
const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')

// scream routes
app.get('/screams', getAllScreams)
//post a scream
app.post('/scream', FBAuth, postOneScream)

// User routes
app.post('/signup', signup)

app.post('/login', login)

exports.api = functions.https.onRequest(app)
