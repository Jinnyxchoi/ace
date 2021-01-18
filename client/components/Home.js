import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      redirect: true
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/signup" />
    }
    return (
      <div className="main">
        <h1 className="main-header">
          Welcome To Your One Stop Project Management App
        </h1>
        <p className="main-description">
          Ace is more than just a project management tool — it’s a better way to
          work. Teams that switch to Ace are more productive and better
          organized. They communicate better and require fewer meetings. And
          they’re far more efficient than before. Ace makes it happen.
        </p>
        <form onClick={this.handleClick}>
          <button type="submit" id="main-page-button">
            TRY IT FREE
          </button>
        </form>

        <h2>See Your Productivity Grow!</h2>
        <p className="main-description">
          Whether you're a software developer, designer, freelancer, consultant,
          architect, media companies, schools, or non-profit, switch to Ace to
          fundamentally improve your project workflow.
        </p>
        <h2 className="quotes">
          “I’ve used Ace for a million projects over the last decade and a half.
          It's beautiful software that has resisted every wrong trend and stayed
          true to the things that mattered most. Highly recommended.”
        </h2>
        <p>-Tobi Lütke, CEO</p>
        <h2 className="quotes">
          “We can see exactly what needs to be done and when. We're much more
          efficient.”
        </h2>
        <p>-Tina Lannin, 121 Captions</p>
        <h2 className="quotes">
          “We've had less confusion with task responsibilities and deadlines,
          which has increased productivity and efficiency.”
        </h2>
        <p>-Dale Lavine, NASA</p>
      </div>
    )
  }
}
