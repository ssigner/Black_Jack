/*Cards Array*/ 
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
/*function*/

function showContent(){
    var Area = document.getElementById("blank");
    var content = "<p>"
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 13; j++){
            content = content + cards[i][j] + " ";
        }
    }
    content = content + "</p>";
    Area.innerHTML = content;
}

function start() {
    var playButton = document.getElementById("show");
    playButton.addEventListener("click", showContent, false);
} 

window.addEventListener("load", start, false);