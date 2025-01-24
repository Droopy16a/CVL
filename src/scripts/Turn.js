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
import poleSport from '../assets/img/poleCulture.jpg'
import poleEvent from '../assets/img/poleEvent.jpg'
import poleCulture from '../assets/img/poleSport.jpg'


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
  
function Turn() { 
    const [nb, setNB] = useState(0);
    const [color, setcolor] = useState("#e6754b");
    const [last, setLast] = useState((0 - vw(5) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
    const [turn1, setTurn1] = useState(null);
    const [turn2, setTurn2] = useState(null);
    const [turn3, setTurn3] = useState(null);
    const [turn4, setTurn4] = useState(null);
    const [r, setr] = useState(false);
    
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
      if (!isMobile){window.addEventListener("scroll", handleScroll);}
      window.addEventListener("resize", () => setLast(((nb) * (vw(250) / 4) - vw(5)) + (((vw(250) / 4) / 2) - (vw(15) / 2))));
  
      return () => {
        window.removeEventListener('keyup', handleKeyClick);
        if (!isMobile){window.removeEventListener("scroll", handleScroll);}
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
      if (!r){
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setCurrentX(e.touches[0].clientX); // Initialize currentX with startX
      }
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

    

    const rotate = () => {
      if (!document.getElementsByClassName('null')[0].className.includes("rotate")) {
        document.getElementsByClassName('null')[0].className = document.getElementsByClassName('null')[0].className + " rotate"
        setr(true);
      } else {
        document.getElementsByClassName('null')[0].className = "cardContainer null"
        setr(false);
      };
      window.scrollTo({
        top: vh(100),
        behavior: "smooth",
      });
      console.log(window.scrollY)
  
  };
  
    return (
      <div
        id='card'
        ref={containerRef}
        onClick={() => {
          rotate();
          console.log(r)
        }}
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
          president="Nom 1 et Nom 2"
          turn={turn1}
          size={turn1 ? "120" : "100"}
          color={color}
          list={[
            [
              "Tournoi de Foot",
              `Photos de groupe et vidéos <b style="color:${color}">GoPro</b> pour revivre les temps forts ! Un tout nouveau système de <b style="color:${color}">maillot</b> est disponible ! <b style="color:${color}">Créez et personnalisez</b> votre maillot à l'image de votre classe pour des <b style="color:${color}">souvenirs mémorables</b>.`
            ],
            [
              "Tournoi E-Sport",
              `Un tournoi <b style="color:${color}">Valorant</b> mixte et pour tous les <b style="color:${color}">niveaux confondus</b>. Retranscription en direct sur <b style="color:${color}">la chaîne twich du lycée</b> avec pleins d'invités`
            ],
            [
              "Green Volley",
              `<b style="color:${color}">Réhabilitation du terrain de Volley</b> dans le parc, qui sera <b style="color:${color}">accessible à tous</b> ! (mise en œuvre par la direction) Tournoi d'équipes de 4 mixtes <b style="color:${color}">Pas de restriction par classe</b>`
            ],
            [
              "Match Prof vs Éleves",
              `A la fin du tournoi de foot sera organisé un match <b style="color:${color}">professeurs élèves</b> ! Ce sera l'occasion de relâcher les tensions accumulées au cours de l'année.`
            ]
          ]}
          blur="0px"
          temps={32}
        />
        <Card
          pole="Culture"
          img={[useCheckMobileScreen() ? bgVertM : bgVert, poleCulture]}
          president="Nom 1 et Nom 2"
          turn={turn2}
          size={turn2 ? "120" : "100"}
          color={color}
          
          list={[
            [
              "Calendrier de l'Avent",
              `Ne manquez pas les <b style="color:${color}">événements</b> qui seront proposés par <b style="color:${color}">Osilys</b> sur <b style="color:${color}">une semaine</b>. Par exemple, l'arrivée du <b style="color:${color}">Père Noël</b> ainsi que de ses <b style="color:${color}">lutins</b>, avec plein d'autres <b style="color:${color}">surprises</b> encore. Installation d'une <b style="color:${color}">boîte aux lettres</b> destinée aux <b style="color:${color}">personnes seules</b> pendant les fêtes (orphelins, personnes âgées, etc.).`
            ],
            [
              "RadioNdo",
              `En format <b style="color:${color}">podcast</b>, des <b style="color:${color}">professeurs</b> viendront nous parler de leurs <b style="color:${color}">sujets favoris</b>, afin d'en apprendre un peu plus sur eux à travers des <b style="color:${color}">anecdotes insolites</b>.`
            ],
            [
              "Friperie",
              `Vous aurez un <b style="color:${color}">ticket</b> pour chaque <b style="color:${color}">vêtement donné</b>, qui permettra de récupérer en échange un autre vêtement. Si vous n'avez pas de <b style="color:${color}">ticket</b>, vous pourrez <b style="color:${color}">acheter</b> le vêtement pour une <b style="color:${color}">somme dérisoire</b>. Les <b style="color:${color}">vêtements restants</b> seront donnés à une <b style="color:${color}">association</b>. L'argent obtenu servira à financer les <b style="color:${color}">projets du CVL</b>.`
            ]
          ]}
          blur="0px"
          temps={32}
        />
        <Card
          pole="Event"
          img={[useCheckMobileScreen() ? bgGrisM : bgGris, poleEvent]}
          president="Nom 1 et Nom 2"
          turn={turn3}
          size={turn3 ? "120" : "100"}
          color={color}
          
          list={[
            [
              "Chasse aux Oeufs (Pâques)",
              `Venez nombreux à la <b style="color:${color}">chasse aux œufs</b> organisée dans le <b style="color:${color}">parc de l'école</b> ! Un <b style="color:${color}">moment convivial</b> partagé entre <b style="color:${color}">petits et grands</b>.`
            ],
            [
              "Saint Valentin",
              `Vous pourrez écrire une <b style="color:${color}">lettre anonyme</b> (ou non) que l'on distribuera à votre <b style="color:${color}">dulciné(e)</b>. Des <b style="color:${color}">moitiés de cœurs</b> seront distribuées à tous à l'entrée de l'école ! Il faudra alors retrouver sa <b style="color:${color}">moitié</b> grâce au <b style="color:${color}">chiffre inscrit</b>. Date : <b style="color:${color}">dernier vendredi avant les vacances</b>, l'occasion de célébrer la <b style="color:${color}">journée de l'élégance</b> !`
            ],
            [
              "Carnaval",
              `<b style="color:${color}">Objectif :</b> TOUT le monde déguisé. Un <b style="color:${color}">défilé</b> aura lieu en fin de journée ainsi qu'un <b style="color:${color}">concours</b> du <b style="color:${color}">meilleur déguisement</b>.`
            ],
            [
              "Chandeleur (2nde)",
              `<b style="color:${color}">Concert</b> et <b style="color:${color}">atelier crêpes</b> avec des <b style="color:${color}">toppings à foison</b> ! Tout cela rien que pour vous les <b style="color:${color}">SECONDES</b> (On ne vous oublie pas).`
            ],
            [
              "Barbecue des premières",
              `Soirée <b style="color:${color}">barbecue</b> en plein air pour vous les <b style="color:${color}">PREMIÈRES</b> ! Une <b style="color:${color}">ambiance chaleureuse</b> avec <b style="color:${color}">musique de fond</b>, au coin du <b style="color:${color}">feu</b>.`
            ],
            [
              "Dernière journée des Terminales",
              `<b style="color:${color}">Activités gonflables</b> et <b style="color:${color}">water slide</b> pour bien commencer l'été. <b style="color:${color}">Lancer de poudre colorée</b> (pour remplacer la farine et les œufs). Après-midi poursuivie d'une <b style="color:${color}">soirée chaleureuse</b>, avant de se dire un <b style="color:${color}">dernier au revoir</b>...`
            ]
          ]}
          blur="0px"
          temps={32}
        />
        <Card
          pole="Com"
          img={[useCheckMobileScreen() ? bgBleuM : bgBleu, poleCom]}
          president="Nom 1 et Nom 2"
          turn={turn4}
          size={turn4 ? "120" : "100"}
          color={color}
          
          list={[
            [
              "Specific Outfit Day",
              `Pourquoi pas s'habiller <b style="color:${color}">corda</b> pour une fois ? Plusieurs jours dans l'année, nous vous suggérerons des <b style="color:${color}">jours spéciaux</b> pour s'habiller dans un <b style="color:${color}">thème donné</b> (Noël, Halloween, hommage à une <b style="color:${color}">célébrité</b>, une <b style="color:${color}">cause</b>...).`
            ]
          ]}
          blur="0px"
          temps={32}
        />
      </div>
    );
}

export default Turn
