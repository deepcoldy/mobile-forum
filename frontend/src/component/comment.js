import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { editCommentStatusAction } from "../actions/form";
import { voteCommentAction, deleteCommentAction } from "../actions/comment";
import ajax from '../service';

const mapstatetoprops = (state, ownProps) => {
  return {
    comment: state.comment
  }
}

const mapdispatchtoprops = (dispatch, ownProps) => {
  return {
    voteComment: (id, score) => {
      dispatch(voteCommentAction(id, score))
    },
    deleteComment: (id) => {
      dispatch(deleteCommentAction(id))
    },
    editCommentStatus: (id) => {
      document.documentElement.scrollTop = document.body.scrollHeight - document.querySelector('form').scrollHeight;
      dispatch(editCommentStatusAction(id))
    },
  }
}

class Comment extends Component {
  voteComment(id, option) {
    this.props.voteComment(id, option === 'upVote' ? 1 : -1)
    ajax.post({
      url: `/comments/${id}`,
      data: {
        option,
      },
    })
  }
  deleteComment(id) {
    this.props.deleteComment(id)
    ajax.delete({
      url: `/comments/${id}`,
    })
  }

  render() {
    const { id, author, timestamp, title, body, voteScore } = this.props.data;
    const date = moment(timestamp).format('LL');
    return (
      <div className="ui comments ui feed">
        <div className="comment event">
          <div className="avatar">
            <i className="user big icon"></i>
          </div>
          <div className="content" style={{display:'block'}}>
            <a className="author">{author}</a>
            <div className="metadata">
              <div>{ date }</div>
              {
                voteScore > 0 ? (
                  <i className="smile icon"></i>
                )
                : voteScore === 0 ? (
                  <i className="meh icon"></i>
                )
                : (
                  <i className="frown icon"></i>
                )
              }
              <div>{voteScore}</div>
            </div>
            <div className="text">
              <p>{title}</p>
              <p>{body}</p>
            </div>
            <div className="actions meta">
              <span className="like"  onClick={() => {
                this.voteComment(id, 'upVote')
              }}>
                <i className="thumbs outline up icon"></i>
              </span>
              <span className="like" onClick={() => {
                this.voteComment(id, 'downVote')
              }}>
                <i className="thumbs outline down icon"></i>
              </span>
              <span className="like" onClick={() => {
                this.props.editCommentStatus(id)
              }}>
                <i className="edit icon"></i>
              </span>
              <i className="trash icon" onClick={() => {
                this.deleteComment(id)
              }}></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(Comment);
