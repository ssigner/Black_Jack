//완성 ver.2
import cards from "./cards.js";

//players card data
let playerCard = [];
let dealerCard = [];
let cardData = new cards()
let playerPoint = 0;
let dealerPoint = 0;
let betMoney = 0;
let chip = 100;
let hiddenCard = "";
let cardType, cardNum, cardSrc = "", cardName = "";
let hiddenTrue = false;
let dealerStart = false;
let highScore = 0;
const key = "highScore"

function reset(){
  playerPoint = 0;
  dealerPoint = 0;
  betMoney = 0;
  hiddenCard = "";
  cardType, cardNum, cardSrc = "", cardName = "";
  hiddenTrue = false;
  dealerStart = false;
  playerCard = [];
  dealerCard = [];
}
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
    chip += betMoney + betMoney*1.5;
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
    if(!cardData.cardsCheck[cardType][cardNum]){
      cardName = cardData.card[cardType][cardNum];
      cardData.cardsCheck[cardType][cardNum] = true;
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
      hiddenCard = "js/trump/" + cardName + ".png";
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      dealerCard.push(cardNum);
      cardSrc = "js/trump/back.png";
      console.log("Src : ", cardSrc);
      dealerCon.innerHTML += "<img id = 'hidden' src = '" + cardSrc + "'>";
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
  setTimeout(()=>{console.log("")}, 2000);
  document.getElementById("play").disabled = true
  makeRandom();
  firstPoint();
  document.getElementById("player_point").innerHTML = playerPoint;
  document.getElementById("dealer_point").innerHTML = 
  dealerPoint - dealerCard[1];
  if(playerPoint == 21){
    document.getElementById("decision").innerHTML = 
    "YOU WIN";
    document.getElementById("play").disabled = true;
    document.getElementById("next_game").style.display = 'block';
    return;
  }
  console.log(hiddenCard);
  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;
}
///////////////////////////Bet Button/////////////////////////////
function betStart(){
  setTimeout(()=>{console.log("")}, 1000);
  betMoney = parseInt(document.getElementById("bet_money").value);
  if(betMoney >= 1 && betMoney <= chip) writeBet();
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
  setTimeout(()=>{console.log("")}, 1000);
  if(playerPoint > 21 && !dealerStart){
    document.getElementById("decision").innerHTML = 
    "YOU LOSE";
    decision_doc();
    return;
  }
  if(dealerStart){
    if(dealerPoint > 21 || dealerPoint < playerPoint){
      betMoney *=2;
      document.getElementById("decision").innerHTML = 
      "YOU WIN";
      calcChip();
      decision_doc();
      return;
    }else if(playerPoint < dealerPoint){
      betMoney = 0;
      document.getElementById("decision").innerHTML = 
      "YOU LOSE";
      calcChip();
      decision_doc();
      
      return;
    }else {
      document.getElementById("decision").innerHTML = 
      "DRAW";
      calcChip();
      decision_doc();
      return;
    }
  }
}
function calcChip(){
  chip += betMoney;
  document.getElementById("chip_count").innerHTML = chip;
}
function decision_doc(){
  document.getElementById("play").disabled = true;
  document.getElementById("next_game").style.display = 'block';
  if(chip <= 0) {
    document.getElementById("stop").disabled = false;
    document.getElementById("again").disabled = true;
  } else{
    document.getElementById("stop").disabled = false;
    document.getElementById("again").disabled = false;
  }
  document.getElementById("hit").disabled = true;
  document.getElementById("stay").disabled = true;
  document.getElementById("bet_place").style.display = 'none';
  betMoney = 0;
  document.getElementById("bet_money").value = betMoney;
}
///////////////////////////Hit Button/////////////////////////////
function hitting(){
  setTimeout(()=>{console.log("")}, 1000);
  randomCard();
  if(cardNum >= 9) cardNum = 10;
  else cardNum++;
  playerPoint += cardNum;
  document.getElementById("player_point").innerHTML = playerPoint;
  console.log(playerPoint);
  cardSrc = "js/trump/" + cardName + ".png";
  console.log("Src : ", cardSrc);
  document.getElementById("container_p").innerHTML += 
  "<img src = '" + cardSrc + "'>";
  if(decision(dealerStart)) return;
}
///////////////////////////First View/////////////////////////////
function firstView(){
  document.getElementById("container_d").innerHTML = 
  "<img src = js/trump/back.png><img src = js/trump/back.png>";
  document.getElementById("container_p").innerHTML = 
  "<img src = js/trump/back.png><img src = js/trump/back.png>";
  setTimeout(()=>{console.log("")}, 1000);
}
///////////////////////////Stay Button/////////////////////////////
function staying(){
  if(!hiddenTrue) hiddenOpen();
  document.getElementById("dealer_point").innerHTML = dealerPoint;
  setTimeout(function(){
    
    if(dealerPoint >= 17) {
      decision(dealerStart);
      return;
    }
    else {
      randomCard();
      if(cardNum >= 9) cardNum = 10;
      else cardNum++;
      cardSrc = "js/trump/" + cardName + ".png";
      document.getElementById("container_d").innerHTML +=
      "<img src = '" + cardSrc + "'>"
      dealerPoint += cardNum;
      document.getElementById("dealer_point").innerHTML = dealerPoint;
      console.log(dealerPoint);
      staying();
    }
  },2500)
  dealerStart = true;
  setTimeout(()=>{console.log("")}, 25);

}
function hiddenOpen(){
  document.getElementById("hidden").src = hiddenCard;
  document.getElementById("hit").disabled = true;
  document.getElementById("stay").disabled = true;
  hiddenTrue = true;
}
///////////////////////////Again Button/////////////////////////////
function doAgain(){
  document.getElementById("next_game").style.display = 'none';
  document.getElementById("bet_container").style.display = 'block';
  document.getElementById("decision").innerHTML = "";
  document.getElementById("bet_money").value = "";
  firstView();
  reset();
  document.getElementById("player_point").innerHTML = playerPoint;
  document.getElementById("dealer_point").innerHTML = dealerPoint;
  setTimeout(()=>{console.log("")}, 1000);
}
///////////////////////////Stop Button/////////////////////////////
function stopping(){
  if(chip != 0 && chip > parseInt(localStorage.getItem(key))){
    highScore = chip;
    localStorage.setItem(key, highScore.toString());
    document.getElementById("score_point").innerHTML = highScore;
  }
  doAgain();
  console.log(localStorage.getItem(key));
  chip = 100;
  document.getElementById("chip_count").innerHTML = chip;
  setTimeout(()=>{console.log("")}, 1000);
}
///////////////////////////High score view/////////////////////////////
function getHighScore(){
  if(localStorage.getItem(key) != null){
    highScore = parseInt(localStorage.getItem(key));
    document.getElementById("score_point").innerHTML = highScore;
    setTimeout(()=>{console.log("")}, 1000);
  } else {
    localStorage.setItem(key, "0");
  }
}

function start() {
  firstView();
  getHighScore();
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", playStart, false);
  var betButton = document.getElementById("bet");
  betButton.addEventListener("click", betStart, false);
  var hitButton = document.getElementById("hit");
  hitButton.addEventListener("click", hitting, false);
  var stayButton = document.getElementById("stay");
  stayButton.addEventListener("click", staying, false);
  var againButton = document.getElementById("again");
  againButton.addEventListener("click", doAgain, false);
  var stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", stopping, false);
} 

addEventListener("load", start, false);