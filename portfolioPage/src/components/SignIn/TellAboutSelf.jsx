import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bg from '../../assets/images/bg.jpg';
import './tas.css';

const Tellaboutself = () => {
  const location = useLocation();
  const { message } = location.state || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    favmovie: '',
    bio: ''
  });

  const cars = ['Ford', 'BMW', 'Audi'];
  const data1 = JSON.parse(localStorage.getItem("myAppData")) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prevData => {
      const updatedForm = {
        ...prevData,
        [name]: value
      };

      const existingData = JSON.parse(localStorage.getItem('myAppData')) || {};
      const mergedData = { ...existingData, ...updatedForm };

      localStorage.setItem('myAppData', JSON.stringify(mergedData));

      return updatedForm;
    });
  };

  const handleSubmit = () => {
    navigate('/dashboard', {
      state: {
        message2: form.favmovie,
        message4: form.bio
      }
    });

    alert("Login Successful!");
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="background-overlay"></div>

      <section id="contact">
        <form>
          <p>Email: {data1.email}</p>

          <label htmlFor="favmovie">Favorite Movie:</label>
          <input
            type="text"
            id="favmovie"
            name="favmovie"
            value={form.favmovie}
            onChange={handleChange}
            required
          />

          <h1>Tell us about yourself</h1>

          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
          />

          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Tellaboutself;