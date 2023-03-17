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
let playerPoint = 0;
let dealerPoint = 0;
let betMoney = 0;
let chip = 100;
let hiddenCard = "";
///////////////////////////Play Button/////////////////////////////

function showBet(){
  document.getElementById("bet_container").style.display = 'block';
  document.getElementById("play").disabled = true;
}

function firstPoint(){
  if(
    (dealerCard[0] == 1 && dealerCard[1] == 10) ||
    (dealerCard[0] == 10 && dealerCard[1] == 1) 
  ) dealerPoint = 21;
  else dealerPoint = dealerCard[0] + dealerCard[1];

  if(
    (playerCard[0] == 1 && playerCard[1] == 10) ||
    (playerCard[0] == 10 && playerCard[1] == 1) 
  ) playerPoint = 21;
  else playerPoint = playerCard[0] + playerCard[1];
  console.log("player : ", playerPoint, "dealer : ", dealerPoint);
}

function makeRandom(){
  //변수 설정
  console.log("setVar");
  let dealerCon = document.getElementById("container_d");
  let playerCon = document.getElementById("container_p");
  var cardType, cardNum, cardSrc = "", cardName = "";

  for(var i = 0; i < 4; i++){
    //카드 타입 모양 설정
    cardType = Math.floor(Math.random() * 4);
    cardNum = Math.floor(Math.random() * 13);
    
    console.log("card", cardType, cardNum);
    console.log("cardCheck", cardsCheck[cardType][cardNum]);

    //카드 명 정하고 카드 배열에 push
    while(true){
      if(!cardsCheck[cardType][cardNum]){
        cardName = cards[cardType][cardNum];
        cardsCheck[cardType][cardNum] = true;
        break;
      }
      else {
        cardType = Math.floor(Math.random() * 4);
        cardNum = Math.floor(Math.random() * 13);
      }
    }

    if(i == 0) {
      console.log("dealer card : ", cardName);
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      dealerCard.push(cardNum);
      cardSrc = "./js/trump/" + cardName + ".png";
      console.log("Src : ", cardSrc);
      dealerCon.innerHTML += "<img src = '" + cardSrc + "'>"
    }
    else if(i == 1) {
      console.log("dealer card : ", cardName);
      hiddenCard = cardName;
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      dealerCard.push(cardNum);
      cardSrc = "js/trump/back.png";
      console.log("Src : ", cardSrc);
      dealerCon.innerHTML += "<img src = '" + cardSrc + "'>"
    }
    else if(i >= 2) {
      console.log("player card : ", cardName);
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      playerCard.push(cardNum);
      cardSrc = "./js/trump/" + cardName + ".png";
      console.log("Src : ", cardSrc);
      playerCon.innerHTML += "<img src = '" + cardSrc + "'>"
    }
  }
}
function playStart(){
  console.log("start");
  makeRandom();
  firstPoint();
  if(playerPoint == 21){
    document.getElementById("decision").innerHTML = 
    "YOU WIN";
    document.getElementById("play").disabled = true;
    document.getElementById("next_game").style.display = 'block';
    return;
  }
  showBet();
}
///////////////////////////Bet Button/////////////////////////////
function betStart(){
  betMoney = document.getElementById("bet_money").value;
  if(betMoney >= 1 && betMoney <= chip) writeBet(betMoney);
  else {
    alert("올바른 베팅 금액을 쓰세요.");
  }
}

function writeBet(){
  document.getElementById("bet_money").value = "";
  document.getElementById("bet_place").style.display = 'block';
  document.getElementById("now_bet").innerHTML = betMoney;
  document.getElementById("bet_container").style.display = 'none';
  chip -= betMoney;
  document.getElementById("chip_count").innerHTML = chip;
  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;
}

function start() {
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", playStart, false);
  var betButton = document.getElementById("bet");
  betButton.addEventListener("click", betStart, false);
} 

window.addEventListener("load", start, false);