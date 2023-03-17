import {cards, cardsCheck} from "./cards.js"

function playStart(){

}

function makeRandom(){

}

function start() {
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", playStart, false);
} 

window.addEventListener("load", start, false);