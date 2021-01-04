import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Todo} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('inside UserHome')
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Todo />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
