import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, handleDemo} = props

  return (
    <div>
      <div className="auth">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button id="signin" type="submit">
              {displayName}
            </button>
          </div>

          {error &&
            error.response && <div> Please enter both email & password </div>}
        </form>
        <form onSubmit={handleDemo} className="demo-button">
          {' '}
          <button id="demo" type="submit">
            Try Demo Login
          </button>
        </form>
        <br />
      </div>
      <div className="password">
        <a href="/forgotpassword">Forgot Password?</a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      let email = evt.target.email.value
      if (email.length === 0) {
        email = null
      }
      let password = evt.target.password.value
      if (password.length === 0) {
        password = null
      }
      dispatch(auth(email, password, formName))
    },
    handleDemo(evt) {
      evt.preventDefault()
      const email = 'demo user'
      const password = '123'

      dispatch(auth(email, password, 'login'))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
