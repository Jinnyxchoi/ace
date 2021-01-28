import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {
  fetchSingleList,
  postTaskThunk,
  updateCompletedThunk
} from '../../store/singleTodoStore'

export class SingleViewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleCheckbox = this.handleCheckbox.bind(this)
  }
  componentDidMount() {
    this.props.loadingList(this.props.match.params.listId)
    console.log('PROPS', this.props.singleTodo)
  }
  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      buttonClicked: true
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let task = evt.target.task.value
    this.setState({
      buttonClicked: false
    })
    console.log(
      'this.props.match.params.listId',
      this.props.match.params.listId
    )
    this.props.postTask(this.props.match.params.listId, task)
  }
  // handleCheckbox(evt) {
  //   evt.preventDefault()
  //   console.log('clicked')
  // this.props.updateComplete(this.props.match.params.listId, )
  // }
  render() {
    const singleTodo = this.props.singleTodo
    console.log('singleTodo', singleTodo)
    const listItems = singleTodo.listItems || []
    return (
      <div className="container">
        <div className="single-list">
          <div id="single-list-name">
            {' '}
            <h2>{singleTodo.name}</h2>
            <p>{singleTodo.description}</p>
          </div>
          <div className="create-task-button">
            <form onClick={this.handleClick}>
              <button type="submit">Create New Task</button>
            </form>
            {this.state.buttonClicked ? (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label htmlFor="task">
                      <small>New Task</small>
                    </label>
                    <input name="task" type="text" />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
          <div className="list-items">
            {listItems.map(item => (
              <div className="listItem" key={item.id}>
                <form>
                  <label>
                    {item.todo}
                    <input
                      name="isGoing"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        this.props.updateComplete(
                          this.props.match.params.listId,
                          item.id,
                          !item.completed
                        )
                      }
                    />
                  </label>
                </form>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Link to="/home">
            <p>Back to all lists</p>
          </Link>
        </div>
      </div>
    )
  }
}
const mapState = state => ({
  singleTodo: state.singleTodo
})

const mapDispatch = dispatch => {
  return {
    loadingList: listID => dispatch(fetchSingleList(listID)),
    postTask: (listID, task) => dispatch(postTaskThunk(listID, task)),
    updateComplete: (listID, taskID, complete) =>
      dispatch(updateCompletedThunk(listID, taskID, complete))
  }
}
export default connect(mapState, mapDispatch)(SingleViewTodo)
