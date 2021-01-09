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
    let listItems = this.props.list.listItems || []
    return (
      <div className="single-todo-list">
        <Link to={`/campuses/${id}`}>
          <p id="name-of-list">{name}</p>
        </Link>

        <p id="description-of-list">{description}</p>
        {listItems.map(item => <p key={item.id}>{item.todo}</p>)}
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
