import React from 'react'

const SingleItem = props => {
  const {todo} = props.item
  return (
    <div>
      <p>{todo}</p>
    </div>
  )
}
export default SingleItem
