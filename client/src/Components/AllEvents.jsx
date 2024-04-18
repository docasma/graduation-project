import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const AllEvents = () => {
    const [eventList, setEventList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);

    useEffect(() => {
        axios.get("http://localhost:8000/api/events/")
            .then(res => {
                const sortedEventList = res.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                const currentDate = new Date();
                const filteredEvents = res.data.filter(event => new Date(event.eventDate) > currentDate);
                setEventList(filteredEvents,sortedEventList);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
    };
    const getNumberOfAttendees = (oneEvent) => {
        return oneEvent.attendees.length;
    };
      // Index du dernier événement sur la page actuelle
    const indexOfLastEvent = currentPage * eventsPerPage;
    // Index du premier événement sur la page actuelle
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // Liste des événements sur la page actuelle
    const currentEvents = eventList.slice(indexOfFirstEvent, indexOfLastEvent);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container m-3,text-primary-emphasis '>
            <p class="fw-bolder fs-5">Here are your upcoming events:</p>
            <div className='d-flex justify-content-center'>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th style={{ color: '#7C3AED' }} scope="col" >Event Name</th>
                            <th style={{ color: '#7C3AED' }}scope="col">Location Name</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Member</th>
                            <th style={{ color: '#7C3AED' }} scope="col" >Date</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((oneEvent) => (
                            <tr key={oneEvent._id}>
                                <td><Link to={`/events/${oneEvent._id}`} className='link'>{oneEvent.eventName}</Link></td>
                                <td>{oneEvent.eventLocation}</td>
                                <td>{getNumberOfAttendees(oneEvent)}/{oneEvent.eventTotalAttendees}</td>
                                <td>{formatDate(oneEvent.eventDate)}</td>
                                <td>{oneEvent.eventTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className='pagination justify-content-center'>
                    {Array.from({ length: Math.ceil(eventList.length / eventsPerPage) }).map((_, index) => (
                        <li key={index} className='page-item'>
                            <button onClick={() => paginate(index + 1)} className='page-link'>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default AllEvents;
