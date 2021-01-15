import React, {Component} from 'react'
import {newListThunk, fetchLists} from '../../store/todoStore'
import {connect} from 'react-redux'
import SingleTodo from './SingleTodo'

export class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadingLists()
  }
  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      buttonClicked: true
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let name = evt.target.listName.value
    let description = evt.target.description.value
    this.setState({
      buttonClicked: false
    })
    this.props.postList(name, description)
  }
  // handleSubmit(evt) {
  //   evt.preventDefault()
  //   this.setState({
  //     buttonClicked: false,
  //     listName: evt.target.listName.value,
  //     description: evt.target.description.value,
  //   })
  //   this.props.post(this.state.listName, this.state.description)
  // }
  render() {
    let {todo} = this.props
    console.log('todo', todo)
    return (
      <div>
        <div id="todo-lists">
          <h2>🌼YOUR TO-DOs🌼</h2>
          <form onClick={this.handleClick}>
            <button type="submit">Create New List</button>
          </form>
        </div>
        {this.state.buttonClicked ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="List Name">
                  <small>List Name</small>
                </label>
                <input name="listName" type="text" />
              </div>
              <div>
                <label htmlFor="Description">
                  <small>Description</small>
                </label>
                <input name="description" type="text" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div> </div>
        )}
        <div className="all-todos">
          {todo.map(each => <SingleTodo key={each.id} list={each} />)}
        </div>
      </div>
    )
  }
}

// const mapDispatch = (dispatch) => ({
//   post: (name, description) => dispatch(newListThunk(name, description)),
// })
const mapState = state => ({
  todo: state.todo
})

const mapDispatch = dispatch => {
  return {
    loadingLists: () => dispatch(fetchLists()),
    postList: (name, description) => dispatch(newListThunk(name, description))
  }
}
export default connect(mapState, mapDispatch)(Todo)
