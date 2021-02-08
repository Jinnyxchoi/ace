import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <nav>
      <img src="../../logo2.png" />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a
            href="https://github.com/Jinnyxchoi/ace"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <a
            href="https://github.com/Jinnyxchoi/ace"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
