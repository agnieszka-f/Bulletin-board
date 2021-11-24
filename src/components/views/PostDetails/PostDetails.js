import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost, getLoggedUser } from '../../../redux/postsRedux.js';

import styles from './PostDetails.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';
import {NotFound} from '../NotFound/NotFound';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '20px auto 20px auto',
  },
  postInfo: {
    paddingTop: '20px',
  },
  postTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Component = function({className, children, post, loggedUser}){
  const classes = useStyles();

  return (
    post ?
      <div className={clsx(className, styles.root)}>
        <Card className={classes.root}>
          {post.image ? <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image={post.image}
          />:''}
          <CardContent>
            <div className={classes.postTitle}>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">Created: {post.created.getFullYear().toString() + '-' + post.created.getMonth().toString().padStart(2,'0') + '-' + post.created.getDate().toString().padStart(2,'0')}</Typography>           
            </div>
            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
              {post.content}
            </Typography>
            <div className={classes.postInfo}>
              {
                post.price ? <Typography variant="subtitle2">Price: ${post.price}</Typography>:''
              }
              {
                post.location ? <Typography variant="subtitle2">Location: {post.location}</Typography>:''
              }
              <Typography variant="subtitle2">Contact: {post.email}</Typography>

            </div>
          </CardContent>
          <CardActions>
            {
              loggedUser && loggedUser == post.autor ? <Button component={Link} to={'/post/' + post.id + '/edit'} size="small" color="primary">
          Edit 
              </Button>:''
            }
          </CardActions>
        </Card>
      </div> : <NotFound />
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  loggedUser: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.id),
  loggedUser: getLoggedUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as PostDetails,
  Container as PostDetails,
  Component as PostDetailsComponent,
};
