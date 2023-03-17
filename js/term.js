//cards Data
const cards = new Array(4);
for(var i = 0; i < 4; i++){
  cards[i] = new Array(13);
}
for(var i = 0; i < 4; i++){
  for(var j = 1; j < 14; j++){
    if(i == 0) cards[i][j-1] = "spade" + j;
    if(i == 1) cards[i][j-1] = "heart" + j;
    if(i == 2) cards[i][j-1] = "clover" + j;
    if(i == 3) cards[i][j-1] = "diamond" + j;
  }
}

let cardsCheck = new Array(4);
for(var i = 0; i < 4; i++){
  cardsCheck[i] = new Array(13);
}
for(var i = 0; i < 4; i++){
  for(var j = 0; j < 13; j++){
    cardsCheck[i][j] = false;
  }
}
//players card data
const playerCard = [];
const dealerCard = [];

function playStart(){
  console.log("start");
  makeRandom();
}

function makeRandom(){
  //변수 설정
  console.log("setVar");
  var cardType, cardNum, cardSrc = "", cardName = "";
  var dealerCon = document.getElementById("container_d");
  var playerCon = document.getElementById("container_p");

  for(var i = 0; i < 4; i++){
    //카드 타입 모양 설정
    cardType = Math.floor(Math.random() * 4);
    cardNum = Math.floor(Math.random() * 13);
    
    console.log("card", cardType, cardNum);
    console.log("cardCheck", cardsCheck[cardType][cardNum]);

    //카드 명 정하고 카드 배열에 push
    while(!cardsCheck[cardType][cardNum]){
      if(!cardsCheck[cardType][cardNum]){
        cardName = cards[cardType][cardNum];
        cardsCheck[cardType][cardNum] = true;
      }
      else {
        cardType = Math.floor(Math.random() * 4);
        cardNum = Math.floor(Math.random() * 13);
      }
    }

    if(i <= 1) {
      console.log("dealer card : ", cardName);
      dealerCard.push(cardName);
      cardSrc = "./js/trump/" + cardName + ".png";
      console.log("Src : ", cardSrc);
      dealerCon.innerHTML += "<img src = '" + cardSrc + "'>"
    } 
    if(i >=2) {
      console.log("player card : ", cardName);
      playerCard.push(cardName);
      cardSrc = "./js/trump/" + cardName + ".png";
      console.log("Src : ", cardSrc);
      playerCon.innerHTML += "<img src = '" + cardSrc + "'>"
    }
  }
}

function start() {
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", playStart, false);
} 

window.addEventListener("load", start, false);