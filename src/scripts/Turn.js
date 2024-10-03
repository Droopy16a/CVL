import React, { useState, useEffect, useRef } from 'react';
import '../css/index.css';

import Card from './Card';
import bgVert from '../assets/img/bgVert.png';
import bgRouge from '../assets/img/bgRouge.png';
import bgBleu from '../assets/img/bgBleu.png';
import bgGris from '../assets/img/bgGris.png';

import bgVertM from '../assets/img/bgVertM.png';
import bgRougeM from '../assets/img/bgRougeM.png';
import bgBleuM from '../assets/img/bgBleuM.png';
import bgGrisM from '../assets/img/bgGrisM.png';

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }
  
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
  
    return (width <= 768);
}
  
function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

const rotate = () => {
    if (!document.getElementsByClassName('null')[0].className.includes("rotate")) {document.getElementsByClassName('null')[0].className = document.getElementsByClassName('null')[0].className + " rotate"} else {document.getElementsByClassName('null')[0].className = "cardContainer null"}
}
  
function Turn() { 
    const [nb, setNB] = useState(0);
    const [last, setLast] = useState((0 - vw(5) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
    const [turn1, setTurn1] = useState(null);
    const [turn2, setTurn2] = useState(null);
    const [turn3, setTurn3] = useState(null);
    const [turn4, setTurn4] = useState(null);
    
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
  
    useEffect(() => {
      const handleKeyClick = (event) => {
        if (event.key === "ArrowRight" && nb !== -3) {
          handleMoveRight();
        } else if (event.key === "ArrowLeft" && nb !== 0) {
          handleMoveLeft();
        }
      };
  
      if (nb === 0) {
        document.body.style.backgroundColor = "#e6754b";
        setTurn1(null);
        setTurn2("turn front");
      } else if (nb === -1){
        document.body.style.backgroundColor = "#cb904a";
        setTurn1("turn back");
        setTurn2(null);
        setTurn3("turn front");
      } else if (nb === -2) {
        document.body.style.backgroundColor = "#0198bf";
        setTurn2("turn back");
        setTurn3(null);
        setTurn4("turn front");
      } else {
        document.body.style.backgroundColor = "#ca665c";
        setTurn3("turn back");
        setTurn4(null);
      }
  
      window.addEventListener("keyup", handleKeyClick);
      window.addEventListener("resize", () => setLast(((nb) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
  
      return () => {
        window.removeEventListener('keyup', handleKeyClick);
        window.removeEventListener("resize", () => setLast(((nb) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
      };
    }, [nb]);
  
    const handleMoveRight = () => {
      setNB(prevNB => prevNB - 1);
      setLast(((nb - 1) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2)));
    };
  
    const handleMoveLeft = () => {
      setNB(prevNB => prevNB + 1);
      setLast(((nb + 1) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2)));
    };
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setCurrentX(e.clientX); // Initialize currentX with startX to prevent instant large diff
    };
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
    
      const movementX = Math.abs(e.clientX - startX);
      if (movementX < 10) return; // Increase this value if necessary for more tolerance
    
      setCurrentX(e.clientX);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      const diff = startX - currentX;
    
      // Only trigger if the difference exceeds the threshold for actual drag
      if (Math.abs(diff) > 10) {
        if (diff > vw(5) && nb !== -3) {
          handleMoveRight();
        } else if (diff < -vw(5) && nb !== 0) {
          handleMoveLeft();
        }
      }
    };
    
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setCurrentX(e.touches[0].clientX); // Initialize currentX with startX
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
    
      const movementX = Math.abs(e.touches[0].clientX - startX);
      if (movementX < 15) return; // Increase the threshold on mobile for better click accuracy
    
      setCurrentX(e.touches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      const diff = startX - currentX;
    
      // Only trigger movement if it exceeds the threshold
      if (Math.abs(diff) > 15) {
        if (diff > vw(5) && nb !== -3) {
          handleMoveRight();
        } else if (diff < -vw(5) && nb !== 0) {
          handleMoveLeft();
        }
      }
    };
  
    return (
      <div
        ref={containerRef}
        onClick = {rotate}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "flex",
          height: "100vh",
          width: "250vw",
          top: 0,
          bottom: 0,
          position: "relative",
          alignItems: "center",
          transition: isDragging ? "none" : "0.5s",
          transform: `translateX(${last}px)`,
          cursor: isDragging ? "grabbing" : "grab"
        }}
      >
        <Card
          pole="Sport"
          img={useCheckMobileScreen() ? bgVertM : bgVert}
          president="Shayan NAKHAEI et Emma GÉNEAU"
          turn={turn1}
          size={turn1 ? "120" : "100"}
        />
        <Card
          pole="Culture"
          img={useCheckMobileScreen() ? bgRougeM : bgRouge}
          president="Clémence RICHARD"
          turn={turn2}
          size={turn2 ? "120" : "100"}
        />
        <Card
          pole="Event"
          img={useCheckMobileScreen() ? bgBleuM : bgBleu}
          president="Matthieu POIRIER-COUTANSAIS et Thalia ZAOUI"
          turn={turn3}
          size={turn3 ? "120" : "100"}
        />
        <Card
          pole="Com"
          img={useCheckMobileScreen() ? bgGrisM : bgGris}
          president="Maxence SINGER"
          turn={turn4}
          size={turn4 ? "120" : "100"}
        />
      </div>
    );
}

export default Turn