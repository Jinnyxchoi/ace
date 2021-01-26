import React, {Component} from 'react'

export default class DeleteList extends Component {
  render() {
    return (
      <div className="delete-list">
        <form>
          <button type="submit">Delete List</button>
        </form>
      </div>
    )
  }
}
