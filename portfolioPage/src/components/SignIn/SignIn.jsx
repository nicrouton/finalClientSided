import React, { use, useState } from 'react';
import './SignIn.module.css';

function buttonAction() {
  alert("Information was submitted.");
}

const SignIn = () => {
  const {username, setUsername} = useState('Hello');
  const {password, setPassword} = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm( (prevData) => ({
      ...prevData,
      [name]: value
  }))

  };
  return (
    <section id="contact">
        <h1>Sign In:</h1>
        <br></br>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required></input>
          <br></br>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" value={form.password} onChange={handleChange} required></input>
          <br></br>
          <input type="submit" value="Submit" onClick={buttonAction}></input>
        </form>
        <h3>Don't Have an Account?</h3>
        <button>Create</button>      
    </section>
  )
};

export default SignIn;