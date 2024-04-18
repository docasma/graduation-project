import './App.css';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Dashboard from './View/Dashboard';
import Create from './Components/Create';
import Search from './Components/Search';
import ShowOneEvent from './Components/ShowOneEvent';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Account from './Components/Account';
import Nav from './Components/Nav';
import Update from './Components/Update';
import JoinOneEvent from './Components/JoinOneEvent';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la connexion de l'utilisateur
  const [notificationCount, setNotificationCount] = useState(0);
  const [eventCreator, setEventCreator] = useState(" ");
  const [Creator, setCreator] = useState('');
 
  const handleCreateEvent = (creator) => {
    setCreator(creator); // Mettre à jour la valeur de Creator
};
  return (
  
    <div  className='container m-3,text-primary-emphasis'>
      
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route 
        path="/dashboard" 
        element= {(
          <>
            <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount} eventCreator={eventCreator}/>
            <Dashboard /> 
          </>
        )}
        />
        <Route 
          path="/new" 
          element={(
            <>
              <Nav handleCreateEvent={handleCreateEvent} Creator={Creator} notificationCount={notificationCount}setNotificationCount={setNotificationCount}eventCreator={eventCreator}/>
              <Create onCreateEvent={(creator) =>{ handleCreateEvent(creator); setNotificationCount(prevCount => prevCount + 1); }  } />
              
            </>
          )} 
        />
        <Route path="/search" element={(
          <>
            <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount} eventCreator={eventCreator}/>
            <Search />
        </>
        )} 
        />
        <Route 
          path="/events/:id" 
          element={(
            <>
              <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount} eventCreator={eventCreator}/>
              <ShowOneEvent />
            </>
        )}
         />
        <Route path="/logout" element={<Logout/>}/>
        <Route 
        path="/account/:eventCreator" 
        element={(
          <>
            <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount}eventCreator={eventCreator} /> 
            <Account />
          </>
        )} 
        />
        <Route 
         path="/edit/:id"
         element={(
          <>
            <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount}eventCreator={eventCreator} /> 
            <Update />
          </>
         )} 
        />
        <Route
        path="/events/:id/register"
        element={(
          <>
            <Nav notificationCount={notificationCount}setNotificationCount={setNotificationCount}eventCreator={eventCreator} /> 
            <JoinOneEvent />
          </>
        )}
        /> 
      </Routes>
    </div>
  );
}

export default App;
