import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleList, postTaskThunk} from '../../store/singleTodoStore'

export class SingleViewTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadingList(this.props.match.params.listId)
  }
  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      buttonClicked: true
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    console.log('going into handleSubmit')
    let task = evt.target.task.value
    console.log('task', task)
    this.setState({
      buttonClicked: false
    })
    console.log(
      'this.props.match.params.listId',
      this.props.match.params.listId
    )
    this.props.postTask(this.props.match.params.listId, task)
  }
  render() {
    const singleTodo = this.props.singleTodo
    console.log('singleTodo', singleTodo)
    const listItems = singleTodo.listItems || []
    return (
      <div>
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
        <div className="single-list">
          <p id="single-list-name">{singleTodo.name}</p>
          <p>{singleTodo.description}</p>
          {listItems.map(item => <p key={item.id}>{item.todo}</p>)}
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
    postTask: (listID, task) => dispatch(postTaskThunk(listID, task))
  }
}
export default connect(mapState, mapDispatch)(SingleViewTodo)
