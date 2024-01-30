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

  return (
    <>
      <div className="grid justify-items-center pt-6"> 
        <img
          src="/stellar_views.png"
          alt="stellar-views"
          className="size-36 w-1/4"
        />
        <h2 className="px-64 pt-10 font-mono text-center">Embark on a celestial journey with our NASA's "Astronomy Picture of the Day" viewer, where the wonders of the universe unfold at your fingertips. Explore the breathtaking beauty of the cosmos, one date at a time.</h2>
        <h2 className="px-64 pt-10 font-mono text-center">Join us in this cosmic odyssey, where each day brings a unique celestial revelation. Take a voyage through time and space, and let the universe's mysteries captivate your imagination.</h2>
        <br/>
        <label className="font-mono">
          Enter a date starting from 1995-06-16 (YYYY-MM-DD): 
          <input
            type="text"
            value={userDate}
            onChange={(e) => setUserDate(e.target.value)}
            className=" ml-2 w-24 rounded-md"
          />
        </label>
        <br></br>
        <button onClick={handleFetchData} className="px-8 font-mono bg-gray-500 rounded-md border-2 border-white">
          Submit
        </button>
        <br></br>
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
