"use client"

import { useEffect, useState } from "react";


export default function Home() {
 const [apodData, setApodData]  = useState([]);
 

 useEffect(() => {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=cch1fD12dqyadllOoD2fXeQqM5GoW0t4l8WAkjSr&date=2014-10-01&concept_tags=True`)
  .then((data) => data.json())
  .then((data) => {
    setApodData(data);
    console.log(data)
  })
 }, []);
 return ( 
 <>
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
      allow="autoplay"
      allowFullScreen
     />
  )}

  </div>
 </>
 )
}