/*Cards Array*/ 
export const cards = new Array(4);
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

export const cardsCheck = new Array(4);
for(var i = 0; i < 4; i++){
  cardsCheck[i] = new Array(13);
}
for(var i = 0; i < 4; i++){
  for(var j = 0; j < 13; j++){
    cardsCheck[i][j] = false;
  }
}

