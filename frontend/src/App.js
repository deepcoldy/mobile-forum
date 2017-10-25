import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ajax from './service';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    ajax.get({
      url: '/categories',
      success: (resp) => {
        this.state.categories = resp
      }
    })
    ajax.get({
      url: '/react/posts',
      success: (resp) => {
        this.state.categories = resp
      }
    })
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>
      </div>
    );
  }
}

export default App;
