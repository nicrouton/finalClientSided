import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg.jpg';
import './pPage.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("myAppData")) || {};

  const handleLogout = () => navigate("/GSignin1");
  const handleGoHome = () => navigate("/", { replace: true });
  const testlocal = () => console.log(localStorage.getItem("myAppData"));

  return (
    <div className="background-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="background-overlay"></div>

      <div className="profile-page">
        <header className="profile-header">
          <h1>Profile Page</h1>
          <div className="button-group">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGoHome}>Go To Movie Home</button>
          </div>
        </header>

        <section className="profile-info">
          <p><strong>Email:</strong> {data.email || "Not provided"}</p>
          <p><strong>Favorite Movie:</strong> {data.favmovie || "None listed"}</p>
          <p><strong>Bio:</strong> {data.bio || "No bio provided"}</p>
        </section>

        <section className="profile-reviews">
          <h3>Reviews</h3>
          {data.newReview && data.newReview.length > 0 ? (
            <ul>
              {data.newReview.map((review, index) => (
                <li key={index}>
                  <strong>{review.author}</strong>: {review.content}
                  <br />
                  <em>Movie: {review.movie?.title || "Unknown"}</em>
                  <br />
                  <span>Rating: {review.author_details?.rating ?? "N/A"}/10</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;