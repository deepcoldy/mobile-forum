import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import ajax from '../service';

const mapStateToProps = (state, props) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    votePost: (id, score) => {
      dispatch({
        type: 'VOTE_POST',
        id,
        score
      })
    },
  }
}

class PostComponent extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.inDetail = this.props.inDetail;

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    if(this.inDetail) return;
    this.setState({hover: !this.state.hover})
  }

  votePost(id, option) {
    this.props.votePost(id, option === 'upVote' ? 1 : -1)
    ajax.post({
      url: `/posts/${id}`,
      data: {
        option,
      },
      success: (resp) => {
        console.log(resp)
      }
    })
  }

  render() {
    const { id, author, timestamp, title, body, voteScore } = this.props.info;
    const date = moment(timestamp).format('LL');

    let linkStyle = {
      padding: '3px',
      backgroundColor: this.state.hover ? 'rgba(0,159,218,0.5)' : '',
      backgroundImage: this.state.hover ? 'radial-gradient(20em circle at left, rgba(0,159,218,0.5),white)': '',
      borderRadius: this.state.hover ? '10px' : '0'
    }

    const post = (
      <div className="ui feed">
        <div className="event">
          <div className="label">
            <img src="https://ws3.sinaimg.cn/large/006tKfTcly1fl0cb0bpyjj30b60b6a9x.jpg" alt="avator"/>
          </div>
          <div className="content">
            <div className="summary">
              <span>{author}</span> posted: {title}
              <div className="date">{date}</div>
            </div>
            <div className="text extra">{body}</div>
            <div className="meta">
              <span className="">
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
                vote: {voteScore}
              </span>
              <span className="like" style={{marginLeft: "2em"}} onClick={() => {
                this.votePost(id, 'upVote')
              }}>
                <i className="thumbs outline up icon"></i>
              </span>
              <span className="like" onClick={() => {
                this.votePost(id, 'downVote')
              }}>
                <i className="thumbs outline down icon"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    )

    const linkBegin = !this.inDetail ? (
      <Link to={`/post/${id}`}>
    ) : ''
    cosnt linkAfter = !this.inDetail ? (
      <Link to={`/post/${id}`}>
    )

    return (
      <div style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        { post }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps  
)(PostComponent);
