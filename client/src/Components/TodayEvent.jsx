import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TodayEvent = () => {
    const [todayList, setTodayList ] = useState([])
    const [eventDate, setEventDate] = useState("");
    const [eventNumber, setEventNumber] = useState(0);

  
    useEffect(() => {
        axios.get("http://localhost:8000/api/events/")
            .then(res => {
                const today = new Date();
                const filteredEvents = res.data.filter(event => {
                    const eventDate = new Date(event.eventDate);
                    return eventDate.getFullYear() === today.getFullYear() &&
                        eventDate.getMonth() === today.getMonth() &&
                        eventDate.getDate() === today.getDate();
                });
                setTodayList(filteredEvents);
                setEventDate(today.toLocaleString('en-US', { month: 'long', day: 'numeric' }));
                setEventNumber(filteredEvents.length);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='container m-3,text-primary-emphasis'>
        
            <div>
            {eventNumber > 0 ? (
                <div>
                    <p>Today is {eventDate} th and you have {eventNumber} event(s) today</p>
                    <div className='d-flex justify-content-center'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Location Name</th>
                                    <th>Attendees</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayList.map((oneEvent) => (
                                    <tr key={oneEvent._id}>
                                        <td><Link to={`/events/${oneEvent._id}`} className='link-dark'>{oneEvent.eventName}</Link></td>
                                        <td>{oneEvent.eventLocation}</td>
                                        <td>{oneEvent.attendees}/{oneEvent.eventTotalAttendees}</td>
                                        <td>{oneEvent.eventTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>There is no event for today</p>
            )}

            </div>
            
        </div>
    );
}

export default TodayEvent;
