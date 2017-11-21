import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

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
      sortBy: 'desc',
      orderBy: 'voteScore',
    }
    // this.changeFilter = this.changeFilter.bind(this)
  }

  componentDidMount() {
    this.props.initFormStatus();
    if(!this.props.post.length){
      ajax.get({
        url: '/posts',
        success: (resp) => {
          this.props.getAllPost(resp)
          console.log(this.props)
          const existId = resp.some((item) => {
            if(item.id === this.props.match.params.id) return true
            return false
          })
          if (resp.length === 0 || !existId) {
            this.props.history.replace('/404')
          }
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

  changeFilter(name, event) {
    this.setState({
      [name]: event.target.value
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
      const orderBy = this.state.orderBy
      const sortBy = this.state.sortBy
      if (orderBy === 'voteScore') {
        return sortBy === 'desc' ?
        b.props.data.voteScore - a.props.data.voteScore
        : a.props.data.voteScore - b.props.data.voteScore;
      } else if (orderBy === 'timestamp') {
        return sortBy === 'desc' ?
          b.props.data.timestamp - a.props.data.timestamp
          : a.props.data.timestamp - b.props.data.timestamp;
      } else {
        return b.props.data.voteScore - a.props.data.voteScore;
      }
      // return b.props.data.voteScore - a.props.data.voteScore
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
          <div>
            Comment Count: {this.props.comment.length}
          </div>
          <div style={{marginTop:'10px'}}>
            Sort way: <select value={this.state.sortBy} onChange={this.changeFilter.bind(this, 'sortBy')} name="sortBy" style={{ marginBottom: '1em', marginRight: '1em' }}>
              <option value="desc">desc</option>
              <option value="asc">asc</option>
            </select>
            Sort kind: <select value={this.state.orderBy} onChange={this.changeFilter.bind(this, 'orderBy')} name="orderBy">
              <option value="voteScore">vote score</option>
              <option value="timestamp">time</option>
            </select>
          </div>
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
)(withRouter(PostDetail));