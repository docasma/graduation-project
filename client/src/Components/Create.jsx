import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate} from 'react-router-dom'

const Create=(props) =>{
    const{onCreateEvent}=props
    const [eventName, setEventName] = useState('');
    const [eventCreator, setEventCreator] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState(null);
    const [eventDescription, setEventDescription] = useState('');
    const [eventTotalAttendees, setEventTotalAttendees] = useState(null);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate()
    const [Creator, setCreator] = useState('');
    const SubmitHandler = (e) => {
        e.preventDefault();

        const newEvent = {
            eventName,
            eventLocation,
            eventCreator,
            eventDate,
            eventTime,
            eventDescription,
            eventTotalAttendees
        };
        
        

        axios.post("http://localhost:8000/api/events/new", newEvent)
            .then(res => {
                console.log(res.data);
                onCreateEvent();
                setCreator(newEvent.eventCreator); // Mettre à jour la valeur de Creator
                navigate('/dashboard')

            })
            .catch(err => {
                if (err.response) {
                    setErrors(err.response.data.errors);
                } else {
                    console.error('Failed to submit:', err.message);
                    // Optionally, inform the user about submission failure
                }
            });
    };

    return (
        <div className='container m-3 text-primary-emphasis align-items-center  '>
           
            <form  className="card text-center align-items-center border border-4 rounded-5  w-50 shadow-lg" style={{ backgroundColor: '#f8f9fa', margin: 'auto' }} onSubmit={SubmitHandler}>
                <div className="col-8 m-3">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Event Name" />
                    {errors.eventName && <p className='text-danger'>{errors.eventName.message}</p>}
                </div>
            
                <div className=" col-8 m-3">
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
                    <button type="submit" class="btn btn-outline-info m-3" >Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Create;



