import React, { Component } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import Scream from '../components/Scream.jsx'
import Profile from '../components/Profile.jsx'

export class home extends Component {
  state = {
    screams: null,
  }

  componentDidMount() {
    axios
      .get('/screams')
      .then(result => {
        this.setState({
          screams: result.data,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream scream={scream} key={scream.screamId} />
      ))
    ) : (
      <p>Loading...</p>
    )
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile>Profile...</Profile>
        </Grid>
      </Grid>
    )
  }
}

export default home
