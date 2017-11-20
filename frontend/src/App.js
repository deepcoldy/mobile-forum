import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux';

import './App.css';
import AllPost from './AllPost';
import PostDetail from "./PostDetail";
import NotFoundPage from "./NotFoundPage";

class App extends Component {

  render() {
    return (
      <div className="index">
        <Route exact path="/" render={() => (
          <Redirect to="/all" />
        )} />
        <Route exact path="/:post" render={({ match })=>(
          <AllPost route={match}/>
        )}/>
        <Route path="/:post/:id" render={({match})=>(
          <PostDetail route={match}/>
        )}/>
        {/* <Route path="*" component={NotFoundPage} /> */}
      </div>
    );
  }
}

export default withRouter(App);
