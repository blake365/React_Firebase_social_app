import React, { Component } from 'react'

//redux
import { Provider } from 'react-redux'
import store from './redux/store'

import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import jwtDecode from 'jwt-decode'
import themeFile from './util/theme'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import NavBar from './components/Navbar'

import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken
let authenticated

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
    localStorage.clear()
  } else {
    authenticated = true
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute
                  exact
                  path='/login'
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path='/signup'
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
