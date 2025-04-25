import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/images/bg.jpg";
import "./ca.css";

const MakeAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      alert("Account Creation Successful!");
      navigate("/tellaboutself");
    }
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="background-overlay"></div>

      <section id="contact">
        <h1>Create Account</h1>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handlePasswordChange} required />

          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default MakeAccount;