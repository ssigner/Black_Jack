//완성 ver.2.3
const card = new Array(4);
for(var i = 0; i < 4; i++){
  card[i] = new Array(13);
}
for(var i = 0; i < 4; i++){
  for(var j = 1; j < 14; j++){
    if(i == 0) card[i][j-1] = "spade" + j;
    if(i == 1) card[i][j-1] = "heart" + j;
    if(i == 2) card[i][j-1] = "clover" + j;
    if(i == 3) card[i][j-1] = "diamond" + j;
  }
}

const cardsCheck = new Array(4);
for(var i = 0; i < 4; i++){
  cardsCheck[i] = new Array(13);
}
for(var i = 0; i < 4; i++){
  for(var j = 0; j < 13; j++){
    cardsCheck[i][j] = false;
  }
}


export default class cards {
  constructor(){
    this.card = card;
    this.cardsCheck = cardsCheck;
  }
}