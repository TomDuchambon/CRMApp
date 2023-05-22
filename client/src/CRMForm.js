import React, { useState } from 'react';
import axios from 'axios';
import './FormStyle.css'

const CRMForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/contacts', { contact: form });

      if (response.data.success) {
        setMessage('Success! Your information has been submitted.');
      } else {
        setMessage('Failed to submit the form. Please try again later.');
      }
    } catch (error) {
      setMessage('One of the fields in invalid.');
    }
  };

  return (
    <div>
      {message && <p className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">
            First Name:
            <input
              className="form-group__input"
              type="text"
              name="firstName"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">
            Last Name:
            <input
              className="form-group__input"
              type="text"
              name="lastName"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address:
            <input
              className="form-group__input"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone Number:
            <input
              className="form-group__input"
              type="text"
              name="phone"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="dob">
            Date of Birth:
            <input
              className="form-group__input"
              type="date"
              name="dob"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );

};

export default CRMForm;
