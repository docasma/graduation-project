
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const { eventCreator} = useParams();
  

  useEffect(() => {
    // Récupérer les événements passés et futurs du créateur spécifique
    axios.get(`http://localhost:8000/api/events?eventCreator=${eventCreator}`)
      .then(res => {
        const now = new Date();
        // Filtrer les événements passés et futurs du créateur spécifique
        const past = res.data.filter(event => new Date(event.eventDate) < now && event.eventCreator === eventCreator);
        const future = res.data.filter(event => new Date(event.eventDate) >= now && event.eventCreator === eventCreator);
        setPastEvents(past);
        setFutureEvents(future);
      })
      .catch(err => {
       console.error(err);
      });
    }, [eventCreator]);


  return (
    <div className='mt-5' >
      
      <div className="card shadow-lg" style={{ backgroundColor: '#f8f9fa', color: 'black' }}>
        <h4 className='text-center mt-4' >{eventCreator}:</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="card m-4 p-2 shadow-lg" style={{ backgroundColor: '#CED4DA', color: 'black' }}>
              <h6>History Events:</h6>
              {pastEvents.length > 0 ? (
                  pastEvents.map(oneEvent => (
                      <ul key={oneEvent.id}>{oneEvent.eventName}</ul>
                  ))
                ) : (
                <p>No past events found.</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card m-4 p-2 shadow-lg" style={{ backgroundColor: '#CED4DA', color: 'black' }}>
              <h6>Future Events:</h6>
              {futureEvents.length > 0 ? (
                futureEvents.map(oneEvent => (
                    <ul key={oneEvent.id}>{oneEvent.eventName}</ul>
                  ))
                ) : (
                <p>No future events found.</p>
              )}
            </div>
        </div>
    </div>
  </div>

    </div>
  );
}

export default Account;
