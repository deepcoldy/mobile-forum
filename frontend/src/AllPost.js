import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import PostComponent from './component/post';
import { updateCategoryAction } from "./actions/category";
import { getAllPostAction, addPostAction } from "./actions/post";
import util from './service';

const mapStateToProps = (state, props) => {
  return {
    post: state.post,
    category: state.category
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCategory: (data) => {
      dispatch(updateCategoryAction(data))
    },
    getAllPost: (data) => {
      dispatch(getAllPostAction(data))
    },
    addPost: (data) => {
      dispatch(addPostAction(data))
    },
  }
}


class AllPost extends Component {

  // state = {
  //   orderBy: 'voteScore',
  //   sort: 'desc', // or 'asc'
  //   title: '',
  // }

  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'voteScore',
      sortBy: 'desc', // or 'asc'
      category: '',
      title: '',
      body: '',
      author: '',
      tabBar: {
        all: '',
      },
      tabBarInit: {
        all: '',
      },
      tabName: 'all'
    }

    this.onChange = this.onChange.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeOrderBy = this.changeOrderBy.bind(this);
  }

  componentDidMount() {
    util.get({
      url: '/posts',
      success: (resp) => {
        this.props.getAllPost(resp)
      }
    })
    util.get({
      url: '/categories',
      success: (resp) => {
        this.props.updateCategory(resp.categories)
        const id = this.props.match.params.post
        if(resp.categories.length > 0){
          resp.categories.forEach((item, index) => {
            if (id === item.name) {
              this.setState({
                tabName: id
              })
            }
            this.setState({
              tabBar: {
                ...this.state.tabBar, 
                [item.name]: id === item.name ? 'active' : ''
              },
              tabBarInit: {
                ...this.state.tabBarInit, 
                [item.name]: ''
              }
            })
          })
          if (id === 'all') {
            this.setState({
              tabBar: {
                ...this.state.tabBar,
                all: 'active'
              }
            })
          }
          this.setState({
            category: resp.categories[0].name
          })
        }
      }
    })
  }

  addPost() {
    const data = {
      id: util.getRandomId(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      timestamp: Date.now(),
      category: this.state.category,
      voteScore: 1,
    }
    if(!data.id || !data.title || !data.body || !data.author || !data.category) {
      alert('please complete all form')
      return;
    }
    this.props.addPost(data)
    util.post({
      url: '/posts',
      data,
      success: (resp) => {
        this.setState({
          title: '',
          body: '',
          author: '',
        })
      }
    })
  }

  onChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }
  changeSort(event) {
    this.setState({
      sortBy: event.target.value
    })
  }
  changeOrderBy(event) {
    this.setState({
      orderBy: event.target.value
    })
  }

  changeTabBar(name) {
    this.props.history.push(`/${name}`)
    this.setState((prevState) => {
      return {
        tabBar: Object.assign(this.state.tabBar,prevState.tabBarInit,{
          [name]: 'active'
        }),
        tabName: name
      };
    })
  }

  render() {
    let allPost = ''
    let category = ''
    let tab = ''

    if(this.props.post.length > 0){
      allPost = this.props.post.map((item, index) => {
        return (
          <PostComponent info={item} key={`comment${index}`} route={this.props.route}/>
        )
      }).filter((item) => {
        if(item.props.info.category === this.state.tabName || this.state.tabName === 'all'){
          if (item.props.info.deleted) return false;
          return true;
        }
        return false;
      }).sort((a, b) => {
        const orderBy = this.state.orderBy
        const sortBy = this.state.sortBy
        if(orderBy === 'voteScore') {
          return sortBy === 'desc' ? 
          b.props.info.voteScore - a.props.info.voteScore
          : a.props.info.voteScore - b.props.info.voteScore;
        } else if (orderBy === 'timestamp') {
          return sortBy === 'desc' ? b.props.info.timestamp - a.props.info.timestamp
          : a.props.info.timestamp - b.props.info.timestamp;
        } else {
          return b.props.info.voteScore - a.props.info.voteScore;
        }
      })
    }
    
    if(this.props.category && this.props.category.length > 0){
      category = this.props.category.map((item, index) => {
        return (
          <option value={item.name} key={`category${index}`}>{item.name}</option>
        )
      })
      tab = this.props.category.map((item, index) => {
        return (
          <a className={ 'item ' + this.state.tabBar[item.name] } key={`tab${index}`} onClick={() => {
            this.changeTabBar(item.name)
          }}>{item.name}</a>
        )
      })
    }
    return (
      <div>
        <div>
          <div className="ui menu">
            <a className={ 'item ' + this.state.tabBar.all } onClick={() => {
            this.changeTabBar('all')
          }}>All</a>
            {tab}
          </div>
          <div className="ui segment active tab">
            <div className="field">
              Sort way: <select value={this.state.sortBy} onChange={this.changeSort} style={{marginBottom: '1em',marginRight: '1em'}}>
                <option value="desc">desc</option>
                <option value="asc">asc</option>
              </select>
              Sort kind: 
              <select value={this.state.orderBy} onChange={this.changeOrderBy}>
                <option value="voteScore">vote score</option>
                <option value="timestamp">time</option>
              </select>
            </div>
            {allPost}
          </div>
          <div className="ui segment active tab">
            <h1>Add a new post</h1>
            <form className="ui reply form">
              <div className="field">
                <label>Select a category</label>
                <select value={this.state.category} onChange={this.onChange} name="category">
                  {category}
                </select>
              </div>
              <div className="ui input field">
                <input type="text" placeholder="title" value={this.state.title} onChange={this.onChange} name="title"/>
              </div>
              <div className="field">
                <textarea rows="2" placeholder="content" value={this.state.body} onChange={this.onChange} name="body"></textarea>
              </div>
              <div className="ui input field">
                <input type="text" placeholder="author" value={this.state.author} onChange={this.onChange} name="author"/>
              </div>
              <div className="ui icon primary left labeled button" role="button" onClick={() => {
                this.addPost()
              }}>
                <i aria-hidden="true" className="edit icon"></i>Add Post
              </div>
            </form>
          </div>
        </div>
        
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllPost));