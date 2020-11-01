import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

import ChatIcon from '@material-ui/icons/Chat'

import MyButton from '../util/MyButton'
import ScreamDialog from './ScreamDialog'
import DeleteScream from './DeleteScream'
import LikeButton from './LikeButton'
import { CardActions, CardHeader } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'

const styles = {
  card: {
    marginBottom: 20,
  },
  image: {},
  content: {
    padding: '0px 20px 0px 20px',
    objectFit: 'cover',
  },
}

export class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      scream: {
        userImage,
        body,
        createdAt,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              src={userImage}
              alt='Profile Image'
              className={classes.image}
            />
          }
          action={deleteButton}
          title={
            <MuiLink
              component={Link}
              to={`/users/${userHandle}`}
              color='primary'
              variant='body1'
            >
              @{userHandle}
            </MuiLink>
          }
          subheader={dayjs(createdAt).fromNow()}
        />
        <CardContent className={classes.content}>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton screamId={screamId} />
          <span>{likeCount}</span>
          <MyButton tip='Comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount}</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardActions>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
