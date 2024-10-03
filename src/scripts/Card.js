// import { useState, useEffect } from 'react';
import '../css/Card.css';
import qm from '../assets/img/qm.png';

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
      <div className='cardBack'>
          <img src={qm}/>
          
          <h1>Pole ...</h1>
          <p>
          Chaussette, brume, escalier, voyage, papillon, cerise, murmure, tapis, éclair, voilier, fenêtre, nuage, forêt, mélodie, sable, étoile, horloge, rivière, plume, café, arc-en-ciel, livre, galaxie, vent, mystère, lune, cabane, océan, feuille, silence, miroir, étincelle, cristal, jardin, montagne, horizon, pluie, arbre, pierre, secret, lumière, écho, feuillage, pont, grange, fusée, pinceau, grenier, désert, colline, étang, ombre, plumeau, boussole, glaçon, ballon, coquillage, tourbillon, trésor, toile, cascade, cendre, épice, givre, carrousel, berceuse, sentier, diamant, fusain, prairie, lueur, souffle, ruche, sorbet, vigne, pétale, flamme, loupe, astre, brique, trésor, manoir, arc, ruelle, fougère, mousse, murmure, poisson, marée, sentinelle, clairière, fantôme, crépuscule, phare, grimoire, phare, plume, automne, lierre, bouton.
          </p>
          <div>
          </div>
      </div>
    </div>
  );
}

export default Card;
