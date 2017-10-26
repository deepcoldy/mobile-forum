import React, { Component } from 'react';
class Category extends Component {

  render() {
    return(
      <div className="ui cards">
        <div className="ui red fluid card">
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Category;