import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteListThunk} from '../../store/todoStore'

class DeleteList extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.deleteList(this.props.id)
  }
  render() {
    return (
      <div className="delete-list">
        <form onSubmit={this.handleClick}>
          <button type="submit">Delete List</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteList: listID => dispatch(deleteListThunk(listID))
  }
}
export default connect(null, mapDispatch)(DeleteList)
