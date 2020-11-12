import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Scream from '../components/scream/Scream.jsx'
import Profile from '../components/profile/Profile.jsx'

import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'

import PropTypes from 'prop-types'

import ScreamSkeleton from '../util/ScreamSkeleton'

export class home extends Component {
  componentDidMount() {
    this.props.getScreams()
  }

  render() {
    const { screams, loading } = this.props.data

    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
    ) : (
      <ScreamSkeleton />
    )
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getScreams })(home)
