
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JoinOneEvent = () => {
    const [attendee, setAttendee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const { id } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, phoneNumber } = attendee;

        const newAttendee = {
            firstName,
            lastName,
            email,
            phoneNumber
        };

        axios.post(`http://localhost:8000/api/events/${id}/register`, newAttendee)
            .then(res => {
                setMessage('Registration successful!');
                setAttendee({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: ''
                });
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrors({ general: err.response.data.message });
                } else {
                    console.error('Failed to submit:', err.message);
                    setErrors({ general: 'Failed to register. Please try again later.' });
                }
            });
    };

    const changeHandler = (e) => {
        setAttendee({ ...attendee, [e.target.name]: e.target.value });
    };

    return (
        <div className="container text-primary-emphasis">
            <form onSubmit={submitHandler} className='col-md-6 mx-auto mt-3 border border-4 rounded-5 text-primary-emphasis p-4 shadow-lg gap-3' style={{ backgroundColor: '#f8f9fa' }}>
                {message && <p className="text-success">{message}</p>}
                {errors.general && <p className='text-danger'>{errors.general}</p>}
                <div className='form-group'>
                    <label>First Name: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={attendee.firstName} name='firstName' />
                </div>

                <div className='form-group'>
                    <label>Last Name: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={attendee.lastName} name='lastName' />
                </div>

                <div className='form-group'>
                    <label>Email: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={attendee.email} name='email' />
                </div>

                <div className='form-group'>
                    <label>Phone Number: </label>
                    <input type="number" className='form-control' onChange={changeHandler} value={attendee.phoneNumber} name='phoneNumber' />
                </div>

                <div className='mt-3'>
                    <button className="btn btn-outline-warning">Register</button>
                </div>
            </form>
        </div>
    );
}

export default JoinOneEvent;

