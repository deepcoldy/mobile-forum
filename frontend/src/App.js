import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import './App.css';
import AllPost from './AllPost';
import PostDetail from "./PostDetail";

const mapStateToProps = (state, props) => {
  return {

  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

class App extends Component {
  
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="index">
        <Route exact path="/" render={()=>(
          <AllPost />
        )}/>
        <Route path="/post/:id" render={({match})=>(
          <PostDetail route={match}/>
        )}/>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
