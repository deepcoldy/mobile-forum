class comment extends Component {
  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <div className="comment">
          <div className="avatar">
            <img src="/assets/images/avatar/small/elliot.jpg" />
          </div>
          <div className="content">
            <a className="author">Elliot Fu</a>
            <div className="metadata">
              <div>Yesterday at 12:30AM</div>
            </div>
            <div className="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div className="actions">
              <a className="">Reply</a>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <div className="avatar">
                <img src="/assets/images/avatar/small/jenny.jpg" />
              </div>
              <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                  <div>Just now</div>
                </div>
                <div className="text">Elliot you are always so right :)</div>
                <div className="actions">
                  <a className="">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="ui reply form">
          <div className="field">
            <textarea rows="3"></textarea>
          </div>
          <button className="ui icon primary left labeled button" role="button">
          <i aria-hidden="true" className="edit icon"></i>Add Reply</button>
        </form>
      </div>
    )
  }
}