
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
let cardType, cardNum, cardSrc = "", cardName = "";

///////////////////////////Play Button/////////////////////////////

function firstPoint(){
  //첫 카드가 블랙잭일 경우
  //playerCard[0] = 1; playerCard[1] = 10;
  if(
    (dealerCard[0] == 1 && dealerCard[1] == 10) ||
    (dealerCard[0] == 10 && dealerCard[1] == 1) 
  ) dealerPoint = 21;
  else dealerPoint = dealerCard[0] + dealerCard[1];

  if(
    (playerCard[0] == 1 && playerCard[1] == 10) ||
    (playerCard[0] == 10 && playerCard[1] == 1) 
  ){
    //1.5배 판정
    playerPoint = 21;
    chip = parseInt(chip) + parseInt(betMoney) + parseInt(Math.round(betMoney * 1.5))
    betMoney = 0;
    document.getElementById("bet_place").style.display = 'none';
    document.getElementById("chip_count").innerHTML = chip;
  } 
  else playerPoint = playerCard[0] + playerCard[1];
  console.log("player : ", playerPoint, "dealer : ", dealerPoint);
}
function randomCard(){
  //카드 타입 모양 설정
  cardType = Math.floor(Math.random() * 4);
  cardNum = Math.floor(Math.random() * 13);
  
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
}
function makeRandom(){
  //변수 설정
  let dealerCon = document.getElementById("container_d");
  let playerCon = document.getElementById("container_p");
  dealerCon.innerHTML = "";
  playerCon.innerHTML = "";
  for(var i = 0; i < 4; i++){
    randomCard();
    if(i == 0) {
      console.log("dealer card : ", cardName);
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      dealerCard.push(cardNum);
      cardSrc = "js/trump/" + cardName + ".png";
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
      dealerCon.innerHTML += "<img src = '" + cardSrc + "'>";
    }
    else if(i >= 2) {
      console.log("player card : ", cardName);
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      playerCard.push(cardNum);
      cardSrc = "js/trump/" + cardName + ".png";
      console.log("Src : ", cardSrc);
      playerCon.innerHTML += "<img src = '" + cardSrc + "'>";
    }
  }
}
function playStart(){
  document.getElementById("play").disabled = true
  makeRandom();
  firstPoint();
  if(playerPoint == 21){
    document.getElementById("decision").innerHTML = 
    "YOU WIN";
    document.getElementById("play").disabled = true;
    document.getElementById("next_game").style.display = 'block';
    return;
  }
  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;
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
  document.getElementById("play").disabled = false;
}
///////////////////////////Win lose/////////////////////////////
function decision(dealerStart){
  if(playerPoint > 21){
    document.getElementById("decision").innerHTML = 
    "YOU LOSE";
    decision_doc();
    return 1;
  } else {
    return 0; //TODO stay시 딜러의 경우도 추가
  }
}
function decision_doc(){
  document.getElementById("play").disabled = true;
  document.getElementById("next_game").style.display = 'block';
  document.getElementById("hit").disabled = true;
  document.getElementById("stay").disabled = true;
  document.getElementById("bet_place").style.display = 'none';
  betMoney = 0;
  document.getElementById("bet_money").value = betMoney;
}
///////////////////////////Hit Button/////////////////////////////
function hitting(){
  randomCard();
  if(cardNum >= 9) cardNum = 10;
  else cardNum++;
  playerPoint += cardNum;
  console.log(playerPoint);
  cardSrc = "js/trump/" + cardName + ".png";
  console.log("Src : ", cardSrc);
  document.getElementById("container_p").innerHTML += 
  "<img src = '" + cardSrc + "'>";
  if(decision()) return;
}
///////////////////////////First View/////////////////////////////
function firstView(){
  document.getElementById("container_d").innerHTML = 
  "<img src = js/trump/back.png><img src = js/trump/back.png>";
  document.getElementById("container_p").innerHTML = 
  "<img src = js/trump/back.png><img src = js/trump/back.png>";
}
function start() {
  firstView();
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", playStart, false);
  var betButton = document.getElementById("bet");
  betButton.addEventListener("click", betStart, false);
  var hitButton = document.getElementById("hit");
  hitButton.addEventListener("click", hitting, false);
} 

window.addEventListener("load", start, false);