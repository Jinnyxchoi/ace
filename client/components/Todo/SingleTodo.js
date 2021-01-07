import React, {Component} from 'react'
import {fetchListItems} from '../../store/listItemsStore'
import {connect} from 'react-redux'
// import SingleItem from './SingleItem'

export default class SingleTodo extends Component {
  componentDidMount() {
    // this.props.loadingListItems(this.props.list.id)
  }
  render() {
    const {name, description, listItems} = this.props.list
    return (
      <div className="single-todo-list">
        <p id="name-of-list">{name}</p>
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
