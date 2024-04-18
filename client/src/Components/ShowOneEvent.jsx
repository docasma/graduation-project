
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';


const ShowOneEvent = () => {
    const [event, setEvent] = useState(null);
    const [isEventDateClicked, setIsEventDateClicked] = useState(false);
    const [isInformationClicked, setIsInformationClicked] = useState(false);
    const [isUsersClicked, setIsUsersClicked] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [attendees, setAttendees] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = () => {
            axios.get(`http://localhost:8000/api/events/${id}`)
                .then(response => {
                    setEvent(response.data);
                })
                .catch(error => {
                    console.error('Error fetching event:', error);
                });
        };

        fetchEvent();
    }, [id]);

    useEffect(() => {
        const generateStaticMapUrl = () => {
            if (event && event.eventLocation) {
                const encodedLocation = encodeURIComponent(event.eventLocation);
                return `https://maps.googleapis.com/maps/api/geocode/json?adress=${encodedLocation}&zoom=13&size=400x400&key=AIzaSyBRFenWMJHtE3pf2l5qrSxjP5UO-fAy36A`;
            }
            return null;
        };

        setImageUrl(generateStaticMapUrl());
    }, [event]);

    const displayEventAttendees = ()=>{
        axios.get(`http://localhost:8000/api/events/${id}/attendees`)
        .then(res => {
          setAttendees(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }; 

    const handleEventDateClick = () => {
        setIsEventDateClicked(true);
        setIsInformationClicked(false);
        setIsUsersClicked(false);
    };

    const handleInformationClick = () => {
        setIsInformationClicked(true);
        setIsEventDateClicked(false);
        setIsUsersClicked(false);
        setAttendees([])
    };

    const handleUsersClick = () => {
        setIsUsersClicked(true);
        setIsEventDateClicked(false);
        setIsInformationClicked(false);
        displayEventAttendees();
       
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
    };
    

    return (
        <div className='container m-3 ,text-primary-emphasis, align-items-center'>
            <div className='card text-center align-items-center w-50 shadow-lg  border border-4 rounded-5 ' style={{ backgroundColor: '#E9ECEF', margin: 'auto'}}>
              {event ? (
                <div>
                 
                    <div className=' m-3'>
                      <button className='btn' onClick={handleEventDateClick} style={{ backgroundColor: isEventDateClicked ? '#7C3AED' : '#ADB5BD', color: 'white' }}>Event Date</button>
                    </div>
                    <div className='card text-center align-items-center  m-3 shadow-lg  'style={{ backgroundColor: '#CED4DA',color:'black' }}> 
                      {isEventDateClicked &&
                        <div className=' w-75 align-items-center  m-3'>
                          <p >Title : {event.eventName}</p>
                          <p >Date : {formatDate(event.eventDate)}</p>
                          <p >Time : {event.eventTime}</p>
                        </div>
                      }
                    </div>
                
                    <div className=' m-3'>
                      <button className='btn' onClick={handleInformationClick} style={{ backgroundColor: isInformationClicked ?'#7C3AED' : '#ADB5BD', color: 'white' }}>Information</button>
                    </div>
                    <div className='card text-center align-items-center  m-3 shadow-lg 'style={{ backgroundColor: '#CED4DA',color:'black' }}>
                      {isInformationClicked && 
                      <div className='text-center w-75 align-items-center  m-3' >
                        <p>Event informations: {event.eventDescription}</p>
                        <p>Location: {event.eventLocation}</p>
                      </div>
                      }
                    </div>
                <div className=''>
                <div className=' m-3'>
                  <button className='btn' onClick={handleUsersClick} style={{ backgroundColor: isUsersClicked ?'#7C3AED' : '#ADB5BD' , color: 'white' }}>Users</button>
                </div>
                <div className='card text-center align-items-center m-3 shadow-lg 'style={{ backgroundColor: '#CED4DA',color:'black' }}>
                  {isUsersClicked &&
                    <div className='text-center w-75 align-items-center  m-3'>
                      <h6>Event Attendees:</h6>
                      <ul>
                        {attendees.map(attendees => (
                          <li key={attendees._id}>{`${attendees.firstName} ${attendees.lastName}`}</li>  
                        ))}
                      </ul>
                    </div>}
                </div>
            </div>
            <div>
                {imageUrl && (
                  <img src={imageUrl} alt="Event Location" />
                )}
              </div>
            </div>
          ) : (
            <h3>Loading ...</h3>
          )}
            <div>
              <h5><Link to={`/edit/${id}`}>Edit</Link></h5>
            </div>
          </div>
        
        </div>
    );
};

export default ShowOneEvent;



