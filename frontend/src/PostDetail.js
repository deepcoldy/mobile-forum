import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Post from './component/post';
import Comment from './component/comment';
import ajax from './service';

const mapStateToProps = (state, props) => {
  return {
    post: state.post,
    postDetail: state.post.length ? state.post.filter((item) => {
      if(item.id === props.route.params.id){
        return true;
      }
      return false;
    }): {},
    comment: state.comment,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllPost: (data) => {
      dispatch({
        type: 'UPDATE_ALLPOST',
        data
      })
    },
    getPostDetail: (data) => {
      dispatch({
        type: 'GET_POST_DETAIL',
        data
      })
    },
    updateComment: (data) => {
      dispatch({
        type: 'UPDATE_COMMENT',
        data
      })
    },
  }
}


class PostDetail extends Component {

  // state = {
  //   orderBy: 'voteScore',
  //   sort: 'desc', // or 'asc'
  //   title: '',
  // }

  constructor(props) {
    super(props);
    this.state = {

    }


  }

  componentDidMount() {
    if(!this.props.post.length){
      ajax.get({
        url: '/posts',
        success: (resp) => {
          this.props.getAllPost(resp)
        }
      })
    }
    const { params } = this.props.route;
    // ajax.get({
    //   url: `/posts/${params.id}`,
    //   success: () => {}
    // })
    this.props.updateComment({})    
    ajax.get({
      url: `/posts/${params.id}/comments`,
      success: (resp) => {
        this.props.updateComment(resp)
      }
    })
  }

  render() {
    // const { id, author, timestamp, title, body, voteScore } = this.props.postDetail.length ? 
    // this.props.postDetail[0]
    // : {};
    // const date = moment(timestamp).format('LL');

    const CommentList = this.props.comment.length ?
    this.props.comment.map((item, index) => {
      return (
        <Comment data={item} key={`comment${index}`}/>
      )
    })
    : ''

    return (
      <div>
        <Link to="/">
          <i className="arrow left icon" style={{marginBottom: '1em'}}/>
        </Link>
        <div className="ui segment active tab">        
          <Post info={this.props.postDetail.length ? this.props.postDetail[0]: {}} 
          inDetail={true}/>
        </div>
        <div className="ui segment active tab">
          {CommentList}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);