import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './post';
import ajax from '../service';


class Category extends Component {

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

export default Category;