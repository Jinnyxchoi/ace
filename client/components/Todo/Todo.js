import React, {Component} from 'react'
import {newListThunk} from '../../store/todoStore'
import {connect} from 'react-redux'

export class Todo extends Component {
  constructor() {
    super()
    this.state = {
      buttonClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      buttonClicked: true
    })
  }
  render() {
    return (
      <div>
        <p>TODO LISTS HERE</p>
        <form onClick={this.handleClick}>
          <button type="submit">New List</button>
        </form>
        {this.state.buttonClicked ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="List Name">
                  <small>List Name</small>
                </label>
                <input name="List Name" type="text" />
              </div>
              <div>
                <label htmlFor="Description">
                  <small>Description</small>
                </label>
                <input name="Description" type="text" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  newList: listObj => dispatch(newListThunk(listObj))
})
export default connect(null, mapDispatch)(Todo)
