import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import ajax from '../service';

const mapstatetoprops = (state, ownProps) => {
  return {
    comment: state.comment
  }
}

const mapdispatchtoprops = (dispatch, ownProps) => {
  return {
    voteComment: (id, score) => {
      dispatch({
        type: 'VOTE_COMMENT',
        id,
        score
      })
    }
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
      success: (resp) => {
        console.log(resp)
      }
    })
  }

  render() {
    const { id, author, timestamp, title, body, voteScore } = this.props.data;
    const date = moment(timestamp).format('LL');
    return (
      <div className="ui comments">
        <div className="comment event">
          <div className="avatar">
            <i aria-hidden="true" className="user big icon"></i>
          </div>
          <div className="content">
            <a className="author">{author}</a>
            <div className="metadata">
              <div>{ date }</div>
              {
                voteScore > 0 ? (
                  <i aria-hidden="true" className="smile icon"></i>
                )
                : voteScore === 0 ? (
                  <i aria-hidden="true" className="meh icon"></i>
                )
                : (
                  <i aria-hidden="true" className="frown icon"></i>
                )
              }
              <div>{voteScore}</div>
            </div>
            <div className="text">
              <p>{title}</p>
              <p>{body}</p>
            </div>
            <div className="actions">
              {/* <a className="">Reply</a> */}
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
            </div>
          </div>
          {/* <div className="ui comments">
            <div className="comment">
              <div className="avatar">
              </div>
              <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                  <div>Just now</div>
                </div>
                <div className="text">Elliot you are always so right :)</div>
                <div className="actions">
                  <a className="">Reply</a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default connect(
  mapstatetoprops,
  mapdispatchtoprops
)(Comment);
