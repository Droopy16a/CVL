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

import poleCom from '../assets/img/poleCom.jpg'
import poleSport from '../assets/img/poleSport.jpg'
import poleEvent from '../assets/img/poleEvent.jpg'
import poleCulture from '../assets/img/poleCulture.jpg'


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

function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}


const rotate = () => {
    if (!document.getElementsByClassName('null')[0].className.includes("rotate")) {
      document.getElementsByClassName('null')[0].className = document.getElementsByClassName('null')[0].className + " rotate"
    } else {
      document.getElementsByClassName('null')[0].className = "cardContainer null"
    };
    window.scrollTo({
      top: vh(100),
      behavior: "smooth",
    });
    console.log(window.scrollY)

}
  
function Turn() { 
    const [nb, setNB] = useState(0);
    const [color, setcolor] = useState("#e6754b");
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

      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      console.log(isMobile);
  
      let lastScrollY = 0;
      let ticking = false;
      let scrollThreshold = isMobile ? 50 : 30; // Adjust scroll sensitivity for mobile
  
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
      
        // Only proceed if the scroll delta exceeds the threshold
        if (scrollDelta < scrollThreshold) return;
      
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (document.getElementsByClassName('null')[0].className.includes("rotate")) {
      document.getElementsByClassName('null')[0].className = "cardContainer null"
            }
            const currentViewportHeight = window.innerHeight;
            if (scrollY > lastScrollY) {
              window.scrollTo({
                top: Math.ceil(scrollY / currentViewportHeight) * currentViewportHeight,
                behavior: 'smooth'
              });
            } else {
              window.scrollTo({
                top: Math.floor(scrollY / currentViewportHeight) * currentViewportHeight,
                behavior: 'smooth'
              });
            }
      
            lastScrollY = scrollY;
            ticking = false;
          });
      
          ticking = true;
        }
      };
      
      const handleKeyClick = (event) => {
        if (event.key === "ArrowRight" && nb !== -3) {
          handleMoveRight();
        } else if (event.key === "ArrowLeft" && nb !== 0) {
          handleMoveLeft();
        }
      };
  
      if (nb === 0) {
        document.body.style.backgroundColor = "#cb904a";
        setTurn1(null);
        setTurn2("turn front");
      } else if (nb === -1){
        document.body.style.backgroundColor = "#e6754b";
        setTurn1("turn back");
        setTurn2(null);
        setTurn3("turn front");
      } else if (nb === -2) {
        document.body.style.backgroundColor = "#ca665c";
        setTurn2("turn back");
        setTurn3(null);
        setTurn4("turn front");
      } else {
        document.body.style.backgroundColor = "#0198bf";
        setTurn3("turn back");
        setTurn4(null);
      }

      
      setcolor(document.body.style.backgroundColor)
  
      window.addEventListener("keyup", handleKeyClick);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", () => setLast(((nb) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
  
      return () => {
        window.removeEventListener('keyup', handleKeyClick);
      window.removeEventListener("scroll", handleScroll);
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
        id='card'
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
          img={[useCheckMobileScreen() ? bgRougeM : bgRouge, poleSport]}
          president="Shayan NAKHAEI et Emma GÉNEAU"
          turn={turn1}
          size={turn1 ? "120" : "100"}
          color={color}
          list={
            [
              ["Tournois Sportifs : Foot, Green Volley, Basket, Rugby", `Rejoignez-nous pour des tournois sportifs avec des finales spectaculaires et des souvenirs en vidéo. Proposez à vos équipes d’acheter des <b style="color : ${color}">maillots personnalisés</b> ou des ballons spécifiques pour un tournoi unique ! <b style="color : ${color}">Une photo de groupe</b> pour les équipes gagnantes sera prise pour immortaliser l’événement. <b style="color : ${color}">Arbitrage impartial garanti.</b>`]
            ]
          }
          blur="8px"
          temps={32}
        />
        <Card
          pole="Culture"
          img={[useCheckMobileScreen() ? bgVertM : bgVert, poleCulture]}
          president="Clémence RICHARD"
          turn={turn2}
          size={turn2 ? "120" : "100"}
          color={color}
          
          list={
            [
              ["Friperie Solidaire", `Apportez vos vêtements et récupérez un <span style="font-weight: bold; color : ${color}">bon échangeable</span> contre un autre vêtement, ou payez si vous n'avez rien à donner.<br>Les vêtements restants seront donnés à une <span style="font-weight: bold; color : ${color}">association.</span><br>Les fonds récoltés serviront à financer les projets du BDE ou seront reversés à une <span style="font-weight: bold; color : ${color}">œuvre caritative</span>.`],
              ["Interventions d'Élèves",  `Des élèves volontaires passeront dans les classes pour <span style="font-weight: bold; color: ${color}">sensibiliser sur des sujets importants</span> comme <span style="font-weight: bold; color: ${color}">l'écologie</span>, <span style="font-weight: bold; color: ${color}">le harcèlement</span>, <span style="font-weight: bold; color: ${color}">les secours</span> ou encore <span style="font-weight: bold; color: ${color}">les inégalités sociales</span>. Ces interventions seront réalisées pendant <span style="font-weight: bold; color: ${color}">les heures d'études des intervenants</span> et en <span style="font-weight: bold; color: ${color}">coordination avec les responsables de niveau</span> pour garantir un cadre éducatif. <span style="font-weight: bold; color: ${color}">Des associations partenaires</span> pourront également être présentées.`]
            ]
          }
          blur="8px"
          temps={32}
        />
        <Card
          pole="Event"
          img={[useCheckMobileScreen() ? bgGrisM : bgGris, poleEvent]}
          president="Matthieu POIRIER-COUTANSAIS et Thalia ZAOUI"
          turn={turn3}
          size={turn3 ? "120" : "100"}
          color={color}
          
          list={
            [
              ["Tournois Sportifs : Foot, Green Volley, Basket, Rugby", `Rejoignez-nous pour des tournois sportifs avec des finales spectaculaires et des souvenirs en vidéo. Proposez à vos équipes d’acheter des <b style="color : ${color}">maillots personnalisés</b> ou des ballons spécifiques pour un tournoi unique ! <b style="color : ${color}">Une photo de groupe</b> pour les équipes gagnantes sera prise pour immortaliser l’événement. <b style="color : ${color}">Arbitrage impartial garanti.</b>`]
            ]
          }
          blur="8px"
          temps={32}
        />
        <Card
          pole="Com"
          img={[useCheckMobileScreen() ? bgBleuM : bgBleu, poleCom]}
          president="Maxence SINGER"
          turn={turn4}
          size={turn4 ? "120" : "100"}
          color={color}
          
          list={
            [
              ["Tournois Sportifs : Foot, Green Volley, Basket, Rugby", `Rejoignez-nous pour des tournois sportifs avec des finales spectaculaires et des souvenirs en vidéo. Proposez à vos équipes d’acheter des <b style="color : ${color}">maillots personnalisés</b> ou des ballons spécifiques pour un tournoi unique ! <b style="color : ${color}">Une photo de groupe</b> pour les équipes gagnantes sera prise pour immortaliser l’événement. <b style="color : ${color}">Arbitrage impartial garanti.</b>`]
            ]
          }
          blur="8px"
          temps={32}
        />
      </div>
    );
}

export default Turn