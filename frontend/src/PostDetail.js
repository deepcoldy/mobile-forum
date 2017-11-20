import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Post from './component/post';
import Comment from './component/comment';
import Form from "./component/form";
import ajax from './service';
import { initFormStatusAction } from "./actions/form";

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
    initFormStatus: () => {
      dispatch(initFormStatusAction())
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
    this.props.initFormStatus();
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

    const CommentList = this.props.comment.length ?
    this.props.comment.map((item, index) => {
      return (
        <Comment data={item} key={`comment${index}`}/>
      )
    }).filter((item) => {
      return !item.props.data.deleted
    }).sort((a, b) => {
      return b.props.data.voteScore - a.props.data.voteScore
    })
    : ''
    const { params } = this.props.route;

    return (
      <div>
        <Link to={`/${params.post}`}>
          <i className="arrow left icon" style={{marginBottom: '1em'}}/>
        </Link>
        <div className="ui segment active tab">        
          <Post info={this.props.postDetail.length ? this.props.postDetail[0]: {}} 
          inDetail={true}/>
        </div>
        <div className="ui segment active tab">
          {CommentList}
        </div>
        <Form parentId={this.props.postDetail.length ? this.props.postDetail[0].id : ''}/>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);