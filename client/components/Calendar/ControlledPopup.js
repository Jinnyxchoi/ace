import Popup from 'reactjs-popup'
import React, {useState} from 'react'

const ControlledPopup = () => {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const handleSubmit = evt => {
    evt.preventDefault()
    console.log(evt.target.date.value)
    console.log(evt.target.eventname.value)
    closeModal()
  }
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Controlled Popup
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
export default ControlledPopup

{
  /* <Popup
          trigger={<button className="button"> Add Event </button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>

              <form onSubmit={this.handleSubmit}>
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
              <div className="actions">
                <button onClick={close} className="button">
                  close modal
                </button>
              </div>
            </div>
          )}
        </Popup> */
}
