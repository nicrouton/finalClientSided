import React, { useState } from 'react';
import './SignIn.module.css';

function buttonAction() {
  alert("Information was submitted.");
}

const Contact = () => {
  return (
    <section id="contact">
        <h1>Contact:</h1>
        <br></br>
        <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" value=""></input>
          <br></br>
          <label for="password">Password:</label>
          <input type="text" id="password" name="password" value=""></input>
          <br></br>
          <input type="submit" value="Submit" onClick={buttonAction}></input>
        </form>      
    </section>
  )
};

export default Contact;