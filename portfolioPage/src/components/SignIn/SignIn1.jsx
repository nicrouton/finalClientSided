import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/images/bg.jpg";
import "./Signinpage.css";

const GSignIn1 = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const data1 = JSON.parse(localStorage.getItem("myAppData")) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const testlocal = () => {
    console.log(localStorage.getItem("myAppData"));
    console.log("Password: " + localStorage.getItem('password'));
  };

  const localstoragrclear = () => {
    localStorage.clear();
  };

  const handleSubmit = () => {
    if (form.password !== data1.password || form.email !== data1.email) {
      alert("Invalid email or password!");
      return;
    }

    navigate('/Dashboard', {
      state: {
        message: form.email,
      }
    });
  };

  const handleCreate = () => {
    navigate("/MakeAccount");
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="background-overlay"></div>

      <section id="contact">
        <h1>Sign In:</h1>

        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>

        <h3>Don't Have an Account?</h3>
        <button type="button" onClick={handleCreate}>Create Account</button>
      </section>
    </div>
  );
};

export default GSignIn1;