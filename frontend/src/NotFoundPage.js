import React, { Component } from "react"
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div>page not found</div>
        <Link to="/">
          <div>return to main page</div>
        </Link>
      </div>
    )
  }
}

export default NotFoundPage