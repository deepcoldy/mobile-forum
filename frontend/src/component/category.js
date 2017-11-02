import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './post';
import ajax from '../service';

const mapStateToProps = (state, props) => {
  return {
    post: state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCategory: (data) => {
      dispatch({
        type: 'UPDATE_CATEGORY',
        data
      })
    },
    getAllPost: (data) => {
      dispatch({
        type: 'UPDATE_ALLPOST',
        data
      })
    },
  }
}


class Category extends Component {

  queryPost(category) {
    ajax.get({
      url: `/${category}/posts`,
      success: (resp) => {
        console.log(resp)
      }
    })
  }
  render() {
    const list = this.props.data && this.props.data.length > 0 ?
    this.props.data.map((category, index) => {
      return(
        <div key={`category${index}`}>
          <div className="ui cards category">
            <div className="ui red fluid card">
              <div className="content">
                <div className="header">{category.name}</div>
              </div>
            </div>
          </div>
          <Post/>
        </div>
      )
    })
    : ''
    return (
      <div>
        {list}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);