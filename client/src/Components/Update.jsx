import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

const Update = () => {

    const [eventName, setEventName] = useState('');
    const [eventCreator, setEventCreator] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState(null);
    const [eventDescription, setEventDescription] = useState('');
    const [eventTotalAttendees, setEventTotalAttendees] = useState(null);
    const [errors, setErrors] = useState({});

    const { id } = useParams()
    const navigate = useNavigate()

    const UpdateHandler = (e) => {
        e.preventDefault()
        console.log("it is working")
        
        axios.patch(`http://localhost:8000/api/events/edit/${id}`, {eventName,eventLocation,eventCreator,eventDate,eventTime,eventDescription,eventTotalAttendees})
            .then(res => {
                console.log(res.data)
                navigate("/Dashboard")
                
            })
            .catch(err => { setErrors(err.response.data.errors) })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then(res => {
                console.log(res.data)
                setEventName(res.data.eventName)
                setEventLocation(res.data.eventLocation)
                setEventCreator(res.data.eventCreator)
                setEventDate(res.data.eventDate)
                setEventTime(res.data.eventTime)
                setEventDescription(res.data.eventDescription)
                setEventTotalAttendees(res.data.eventTotalAttendees)
                
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

  return (
    <div className='container m-3,text-primary-emphasis,align-items-center'>
         <form className="card text-center align-items-center w-50 shadow-lg border border-4 rounded-5" style={{ backgroundColor: '#f8f9fa', margin: 'auto' }}onSubmit={UpdateHandler}>
                <div className="col-8 m-3">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Event Name" />
                    {errors.eventName && <p className='text-danger'>{errors.eventName.message}</p>}
                </div>
            
                <div className="col-8 m-3">
                    <label> Creator:</label>
                    <input type="text" className="form-control" value={eventCreator} onChange={e => setEventCreator(e.target.value)} placeholder="Event Creator" />
                    {errors.eventCreator && <p className='text-danger'>{errors.eventCreator.message}</p>}
                </div>

                <div className="col-8 m-3">
                    <label>Location:</label>
                    <input type="text" className="form-control" value={eventLocation} onChange={e => setEventLocation(e.target.value)} placeholder="Event Location" />
                    {errors.eventLocation && <p className='text-danger'>{errors.eventLocation.message}</p>}
                </div>
                <div className="col-8 m-3">
                    <label>Date:</label>
                    <input type="date" className="form-control" value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="Event Date" />
                    {errors.eventDate && <p className='text-danger'>{errors.eventDate.message}</p>}
                </div>
                <div className="col-8 m-3">
                    <label>Time:</label>
                    <input type="time" className="form-control" value={eventTime} onChange={e => setEventTime(e.target.value)} placeholder="Event Time" />
                    {errors.eventTime && <p className='text-danger'>{errors.eventTime.message}</p>}
                </div>
                <div className="col-8 m-3">
                    <label>Total Attendees:</label>
                    <input type="number" className="form-control" value={eventTotalAttendees} onChange={e => setEventTotalAttendees(e.target.value)} placeholder="Event Total Attendees" />
                    {errors.eventTotalAttendees && <p className='text-danger'>{errors.eventTotalAttendees.message}</p>}
                </div>
                <div className="col-8 m-3">
                    <label>Description:</label>
                    <textarea type="text" className="form-control" value={eventDescription} onChange={e => setEventDescription(e.target.value)} placeholder="Event Description" />
                    {errors.eventDescription && <p className='text-danger'>{errors.eventDescription.message}</p>}
                </div>
                <div>
                    <button className="btn btn-outline-warning m-3">Update the event</button>
                </div>
            </form>
    </div>
  )
}

export default Update