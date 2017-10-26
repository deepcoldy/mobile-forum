import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ajax from './service';
import Category from './component/category';
import updateCategory from './actions'

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    ajax.get({
      url: '/categories',
      success: (resp) => {
        dispatch(updateCategory(resp))
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

        <Category name/>
      </div>
    );
  }
}

export default App;
