import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'

import MuiLink from '@material-ui/core/link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props

  return (
    <Paper elevation={2} className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={imageUrl} alt='profile' className='profile-image' />
          <input
            type='file'
            id='imageInput'
            hidden='hidden'
            onChange={this.handleImageChange}
          />
        </div>
        <hr />
        <div className='profile-details'>
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color='primary'
            variant='h5'
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant='body2'>{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color='primary' />
              <span>{location}</span>
            </Fragment>
          )}
          <hr />
          {website && (
            <Fragment>
              <LinkIcon color='primary' />
              <a href={website} target='_blank' rel='noopener noreferrer'>
                {''}
                {website}
              </a>
            </Fragment>
          )}
          <hr />
          <CalendarToday color='primary' />
          <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>

        <hr />
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default StaticProfile
