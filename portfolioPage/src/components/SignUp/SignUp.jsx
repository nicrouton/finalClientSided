import React, { use, useState } from 'react';
import styles from './SignUp.module.css'

function buttonAction() {
  alert("Information was submitted.");
}

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    // extracting name and value from target
    const {name, value} = e.target;
    setForm( (prevData) => ({
      ...prevData,
      [name]: value
  }))}

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Sign Up</h1>
            <br></br>
            <form>
                <label className={styles.emailLabel} htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required></input>
                <br></br>
                <label className={styles.usernameLabel} htmlFor="username">Username:</label>
                <input type="email" id="username" name="username" value={form.username} onChange={handleChange} required></input>
                <br></br>
                <label className={styles.passWordLabel} htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" value={form.password} onChange={handleChange} required></input>
                <br></br>
                <input type="submit" value="Submit" onClick={buttonAction}></input>
            </form>
        </div>
    )
}

export default SignUp;