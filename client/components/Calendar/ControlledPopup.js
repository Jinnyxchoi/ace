import Popup from 'reactjs-popup'
import React, {useState} from 'react'
import {postEventThunk} from '../../store/monthlyEvents'
import {connect} from 'react-redux'

const ControlledPopup = props => {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const handleSubmit = evt => {
    evt.preventDefault()
    const obj = {
      eventDate: evt.target.date.value,
      event: evt.target.eventname.value,
      userId: props.user.id
    }
    console.log('props', props.dateObject._d.getMonth())
    props.postEvent(obj, props.dateObject._d.getMonth())
    closeModal()
  }
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Add Event
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            CLOSE
          </a>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">
                <small>Event Date</small>
              </label>
              <input type="date" id="date" />
            </div>
            <div>
              <label htmlFor="eventname">
                <small>Event Name</small>
              </label>
              <input name="eventname" type="text" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  events: state.monthlyEvents
})

const mapDispatch = dispatch => ({
  postEvent: (obj, currentMonth) => dispatch(postEventThunk(obj, currentMonth))
})

export default connect(mapState, mapDispatch)(ControlledPopup)
