
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';

const Nav = (props) => {
    const { notificationCount, setNotificationCount } = props;
    const [activeLink, setActiveLink] = useState("/Dashboard");
    const [isNotificationCountClicked, setIsNotificationCountClicked] = useState(false);
    const [newEventMessages, setNewEventMessages] = useState([]); // Liste des messages de nouveaux événements
    const [isNotificationVisible, setIsNotificationVisible] = useState(false); // État pour contrôler la visibilité des notifications
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleNotificationCountClick = () => {
        
        alert("a new event is added")
        setNotificationCount(0);
        setIsNotificationCountClicked(true);
        setIsNotificationVisible(true); // Afficher les notifications lorsqu'elles sont cliquées
        
    };

    

    const links = [
        { path: "/Dashboard", text: "Home" },
        { path: "/New", text: "New" },
        { path: "/Search", text: "Search" },
        // { path: "/account/:eventCreator", text: "Account"}
    ];

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #64FFFD , #F8F9FA)', color: '#000', margin: '10px 0', overflow: 'hidden' }}>
            <div className="container-md">
                <h3 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#7C3AED' }}>MedEv</h3>
                <ul className="nav nav-tabs">
                    {links.map((link, index) => (
                        <li className="nav-item" key={link.path}>
                            <Link 
                                to={link.path} 
                                className={`nav-link ${activeLink === link.path ? 'active' : ''}`}
                                onClick={() => setActiveLink(link.path)}
                                style={{ color: '#6c757d' }}
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                {notificationCount > 0 && (
                    <div>
                        <button className="btn btn-primary" onClick={handleNotificationCountClick} style={{ marginLeft: '10px' }}>{notificationCount} Notifications</button>
                    </div>
                )}
                {isNotificationCountClicked && (
                    <div>
                        {isNotificationVisible && (
                            <ul>
                                {newEventMessages.map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        )}
                       
                    </div>
                )}
                <Logout />  
            </div>
        </nav>
    );
}

export default Nav;





