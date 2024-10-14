import { useEffect, useState } from 'react';
import '../css/Card.css';
import Timer from './timer.js'

function Card({pole, img, president, turn, size, color, list, blur, temps}) {
  const [isMobile, setIsMobile] = useState(/Mobi|Android/i.test(navigator.userAgent));
  useEffect(()=>{
    window.addEventListener('resize', () => setIsMobile(/Mobi|Android/i.test(navigator.userAgent)));
    
    return () => {
      window.removeEventListener('resize', () => setIsMobile(/Mobi|Android/i.test(navigator.userAgent)));
  }
  })
  return (
    <div className={"cardContainer " + turn}>
      <div className='card' style={{background: `url(${img[0]})`, backgroundSize: `${size}%`}}>
        <img src={img[0]} alt={"bgVert"}/>
        <div className='textContainer'>
          <h2>Pole</h2>
          <h1>{pole}</h1>
          <h3>Presidents : {president}</h3>
        </div>
      </div>
      <div className='cardBack'>
          <h1 style={{color : color}}>Pole {pole}</h1>
          <h3 style={{color : color}}>Presidents : {president}</h3>
          <img src={img[1]} />
          <div>
            {/* <Timer
            color={color}
            temps={temps}
            /> */}
            {list.map((item, index) => (
              <div className='paraCard' style={{filter:`blur(${blur})`}}>
              <h2 
                key={index}
                style={{
                  marginBottom: 0,
                  textAlign: "left",
                  color: color
                }}
              >
                {item[0]}
              </h2>
              <div style={{flexDirection: "row-reverse", flexWrap: "nowrap"}}>
                {isMobile || img[index + 2] === undefined ? "" :  <img src={img[index + 2]} style={{width: "35%", left: 0, padding : "1em"}}/>}
                <p dangerouslySetInnerHTML={{ __html: item[1] }} />
              </div>
              </div>
            ))}
          </div>
          <div>
          </div>
      </div>
    </div>
  );
}

export default Card;
