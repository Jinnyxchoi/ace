import React, {Component} from 'react'

export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="verify-email">
        <h3>Enter your email to renew your password.</h3>
        <form>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>

          <div>
            <button id="signin" type="submit">
              Verify Email
            </button>
          </div>
        </form>
      </div>
    )
  }
}
