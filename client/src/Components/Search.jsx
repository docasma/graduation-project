
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
    const [eventList, setEventList] = useState([]);
    const [filterOption, setFilterOption] = useState('Name');
    const [searchValue, setSearchValue] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5);

    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8000/api/events/")
            .then(res => {
                const sortedEventList = res.data.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                const currentDate = new Date();
                const filteredEvents = res.data.filter(event => new Date(event.eventDate) > currentDate);
                setEventList(sortedEventList);
                setFilteredEvents(filteredEvents);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
    };
    const generateHighlightedDates = () => {
        const highlightedDates = [];
        filteredEvents.forEach(event => {
            const eventDate = new Date(event.eventDate);
            highlightedDates.push(eventDate);
        });
        return highlightedDates;
    };

    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim() === '' && !selectedDate) { // Modification pour vérifier si la recherche est vide et aucune date n'est sélectionnée
            setErrorMessage('Please enter a search value or select a date.');
            return;
        }

        const updatedFilteredEvents = eventList.filter(event => {
            if (selectedDate) { // Vérifier si une date est sélectionnée
                const selectedDateFormatted = formatDate(selectedDate);
                const eventDateFormatted = formatDate(event.eventDate);
                return selectedDateFormatted === eventDateFormatted;
            } else if (filterOption === 'Name') {
                return event.eventName.toLowerCase().includes(searchValue.toLowerCase());
            } else if (filterOption === 'Location') {
                return event.eventLocation.toLowerCase().includes(searchValue.toLowerCase());
            } else if (filterOption === 'Creator') {
                return (event.eventCreator && event.eventCreator.toLowerCase().includes(searchValue.toLowerCase()));
            }
            return false;
        });

        if (updatedFilteredEvents.length === 0) {
            setErrorMessage(`No events found for "${searchValue}" in ${filterOption}.`);
            setFilteredEvents([])
            setFilterOption('')
        } else {
            setFilteredEvents(updatedFilteredEvents);
            setErrorMessage('');
            
        }
    };

    const getNumberOfAttendees = (oneEvent) => {
        if (Array.isArray(oneEvent.attendees)) {
            return oneEvent.attendees.length;
        } else {
            return 0;
        }
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container m-3 text-primary-emphasis align-items-center'>
            <form className="card text-center align-items-center w-50 shadow-lg border border-4 rounded-5" style={{ backgroundColor: '#f8f9fa', margin: 'auto' }} onSubmit={handleSearch}>
                <div className="col-8 m-3">
                    <label htmlFor="filterOption" className="form-label m-3">Search by:</label>
                    <input className="form-control m-3" list="datalistOptions" placeholder="Type to search..." value={filterOption} onChange={(e) => setFilterOption(e.target.value)} />
                    <datalist id="datalistOptions">
                        <option value="Name" />
                        <option value="Location" />
                        <option value="Creator" />
                        <option value="Date" />
                    </datalist>
                </div>
                <div className="col-8 m-3">
                    {filterOption === 'Date' && (
                        <DatePicker
                            className="form-control m-3"
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            placeholderText="Select date"
                            highlightDates={generateHighlightedDates()} // Utilisation de la fonction pour mettre en évidence les dates avec des événements
                        />
                    )}
                    {filterOption !== 'Date' && (
                        <input className="form-control m-3" type="text" value={searchValue} placeholder="Type One..." onChange={(e) => setSearchValue(e.target.value)} />
                    )}
                </div>
                <div>
                    <button type="submit" className="btn btn-outline-info m-3">Search</button>
                </div>
            </form>

            <div className='d-flex justify-content-center m-3' style={{ color: '#6B46C1' }}>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
            <div className='container m-3 d-flex justify-content-center'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{ color: '#7C3AED' }} scope="col">Name</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Location</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Member</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Date</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Time</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Creator</th>
                            <th style={{ color: '#7C3AED' }} scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((oneEvent) => (
                            <tr key={oneEvent._id}>
                                <td><Link to={`/events/${oneEvent._id}`} className=''>{oneEvent.eventName}</Link></td>
                                <td>{oneEvent.eventLocation}</td>
                                <td>{getNumberOfAttendees(oneEvent)}/{oneEvent.eventTotalAttendees}</td>
                                <td>{formatDate(oneEvent.eventDate)}</td>
                                <td>{oneEvent.eventTime}</td>
                                <td><Link to={`/account/${oneEvent.eventCreator}`}>{oneEvent.eventCreator ? `${oneEvent.eventCreator}` : 'Unknown'}</Link></td>
                                <td>
                                    {getNumberOfAttendees(oneEvent) === oneEvent.eventTotalAttendees ? 'Full' : <Link to={`/events/${oneEvent._id}/register`}>Join</Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className='pagination justify-content-center'>
                    {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
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
};

export default Search;
