import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initFormStatusAction } from "../actions/form";
import util from '../service';

const mapStateToProps = (state, props) => {
  return {
    form: state.form,
    comment: state.comment,
    post: state.post,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addComment: (data) => {
      dispatch({
        type: 'ADD_COMMENT',
        data
      })
    },
    putNewPost: (title, body, id) => {
      document.documentElement.scrollTop = 0;
      dispatch({
        type: 'EDIT_POST',
        title,
        body,
        id,
      })
    },
    putNewComment: (body, id) => {
      dispatch({
        type: 'EDIT_COMMENT',
        body,
        id,
      })
    },
    initFormStatus: () => {
      dispatch(initFormStatusAction())
    },
  }
}


class AddPost extends Component {


  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  postData() {
    if (this.props.form.status === 'normal') {
      const data = {
        id: util.getRandomId(),
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        parentId: this.props.parentId,
        voteScore: 1,
      }
      if (!data.id || !data.timestamp || !data.body || !data.author || !data.parentId) {
        alert('please complete the form')
        return
      }
      this.props.addComment(data)
      util.post({
        url: '/comments',
        data,
        success: () => {}
      })
    } else if (this.props.form.status === 'edit_comment') {
      const data = {
        body: this.state.body
      }
      if(!data.body) {
        alert('please complete body')
        return;
      }
      this.props.putNewComment(this.state.body, this.props.form.id)
      util.put({
        url: `/comments/${this.props.form.id}`,
        data: {
          body: this.state.body,
        }
      })
      this.props.initFormStatus();
    } else if (this.props.form.status === 'edit_post') {
      const data = {
        title: this.state.title,
        body: this.state.body
      }
      if (!data.body || !data.title) {
        alert('please complete body')
        return;
      }
      this.props.putNewPost(this.state.title, this.state.body, this.props.form.id)
      util.put({
        url: `/posts/${this.props.form.id}`,
        data: {
          body: this.state.body,
          title: this.state.title,
        }
      })
      this.props.initFormStatus();
    }
    this.setState({ //init
      title: '',
      body: '',
      author: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.form.id && nextProps.form.status === 'edit_comment') {
      const currentComment = nextProps.comment.filter((item) => {
        if (item.id === nextProps.form.id) return true;
        return false
      })
      console.log('currentComment',currentComment)
      this.onChange({
        target: {
          value: currentComment[0].body,
          name: 'body'
        }
      })
    } else if (nextProps && nextProps.form.id && nextProps.form.status === 'edit_post') {
      const currentPost = nextProps.post.filter((item) => {
        if (item.id === nextProps.form.id) return true;
        return false
      })
      console.log('currentPost', currentPost)
      this.onChange({
        target: {
          value: currentPost[0].title,
          name: 'title'
        }
      })
      this.onChange({
        target: {
          value: currentPost[0].body,
          name: 'body'
        }
      })
    }
  }
  
  render() {
    let normalForm = true;
    let editPost = false;
    if (this.props.form.status !== 'normal') {
      normalForm = false;
    }
    if (this.props.form.status === 'edit_post') {
      editPost = true;
    }

    function title() {
      return normalForm ? 'Add a new Comment'
        : editPost ? 'Edit Post'
          : 'Edit Comment'
    }
    
    return (
      <div className="ui segment active tab">
        <h1>{
          title()
        }</h1>
        <form className="ui reply form">
          {
            editPost ? (
              <div className="ui input field">
                <input type="text" placeholder="title" value={this.state.title} onChange={this.onChange} name="title" />
              </div>
            ) : ""
          }
          <div className="field">
            <textarea rows="2"  placeholder="content" value={ this.state.body
              } onChange={this.onChange} name="body"></textarea>
          </div>
          {
            normalForm ? (
              <div className="ui input field">
                <input type="text" placeholder="author" value={this.state.author} onChange={this.onChange} name="author" />
              </div>
            ) : ""
          }
          <div className="ui icon primary left labeled button" role="button" onClick={() => {
            this.postData()
          }}>
            <i aria-hidden="true" className="edit icon"></i>{
              normalForm ? 'Add Comment' : 'Edit'
            }
          </div>
        </form>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);