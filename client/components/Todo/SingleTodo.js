import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import SingleItem from './SingleItem'

export default class SingleTodo extends Component {
  componentDidMount() {
    // this.props.loadingListItems(this.props.list.id)
  }
  render() {
    const {id, name, description} = this.props.list

    return (
      <div className="todo-list">
        <Link to={`/todo/${id}`}>
          <h4 id="name-of-list">{name}</h4>
        </Link>

        <p id="description-of-list">{description}</p>
      </div>
    )
  }
}
// const mapDispatch = (dispatch) => ({
//   loadingListItems: (listId) => dispatch(fetchListItems(listId)),
// })
// const mapState = (state) => ({
//   items: state.items,
// })
// export default connect(mapState, mapDispatch)(SingleTodo)
