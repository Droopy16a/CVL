// import { useState, useEffect } from 'react';
import '../css/Card.css';

function Card({pole, img, president, turn, size}) {
  return (
    <div className={"cardContainer " + turn}>
  <div className='card' style={{background: `url(${img})`, backgroundSize: `${size}%`}}>
        <img src={img} alt={"bgVert"}/>
        <div className='textContainer'>
          <h2>Pole</h2>
          <h1>{pole}</h1>
          <h3>Presidents : {president}</h3>
          </div>
      </div>
    </div>
  );
}

export default Card;
