"use client"

import { useState } from "react";

export default function Home() {
  const [userDate, setUserDate] = useState('');
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = () => {
    if (userDate.trim() !== '') {
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=cch1fD12dqyadllOoD2fXeQqM5GoW0t4l8WAkjSr&date=${userDate}&concept_tags=True`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setApodData(data);
          console.log(data);
          setUserDate('');
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error fetching data:', error);
        });
    }
  };

  const handleClearData = () => {
    setApodData(null);
  }

  return (
    <>
      <div className="main-container"> {/* Apply the styles for the main container */}
        <label>
          Enter a date starting from 1995-06-16 (YYYY-MM-DD):
          <input
            type="text"
            value={userDate}
            onChange={(e) => setUserDate(e.target.value)}
          />
        </label>
        
        <button onClick={handleFetchData}>
          Submit
        </button>

        <button onClick={handleClearData}>
          Clear
        </button>

        {error && <p>Error: {error}</p>}

        {apodData && (
          <div>
            {apodData.media_type === "image" ? (
              <img
                src={apodData.url}
                alt={apodData.title}
              />
            ) : (
              <iframe
                title="space-video"
                src={apodData.url}
                gesture="media"
                allow="encrypted-media"
                allowFullScreen
              />
            )}

            <h1>{apodData.title}</h1>
            <p>Date: {apodData.date}</p>
          </div>
        )}
      </div>
    </>
  );
}