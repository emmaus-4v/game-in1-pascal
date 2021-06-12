/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

//Globale variabels
const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const GESCOORD = 3;
const START = 4;
var spelStatus = START;

var spelerX = 0; 
var spelerY = 0; 
var spelerInHole = 0;

var holeX = 0;
var holeY = 0;
var DiffHoleX = 0;
var DiffHoleY = 0;

var puntX = 0;
var puntY = 0;
var diffX = 0;
var diffY = 0;
var LijnTekenen = 0;

var speedX = 0;
var speedY = 0;
var friction = 0.95;

var shotCount = 0;
var par = 0;

var ScoreText = "ScoreText";
var playColor = "ffffff";

var currentLevel = 1; 


//Functies

var tekenSpeler = function(x, y) {
    fill("white");
    stroke(255, 255, 255);
    ellipse(x, y, 50, 50);
};

var tekenHole = function(x, y) {
  fill("black");
  stroke(0, 0, 0);
  ellipse(x, y, 65,65);
  stroke(255, 255, 255);
  fill("white");
}

var tekenLijn = function(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
}

var muisInputLijn = function() {
    if(mouseIsPressed && diffX < 10 && diffY < 10) {
        LijnTekenen = 1;
    }
    else if(!mouseIsPressed && LijnTekenen === 1) {
        LijnTekenen = 0;
        speedX = diffX;
        speedY = diffY;
        shotCount++;
    }
}
var beweegSpeler = function() {
    //Launchen
    spelerX = (spelerX + (speedX / 5));
    spelerY = (spelerY + (speedY / 5));
    speedX = speedX * friction;
    speedY = speedY * friction;

    //Stuiteren
    if(spelerX >= 1255) {
        if(speedX > 0) {
            speedX = speedX * -1;
        }
    } else if(spelerX <= 25) {
        if(speedX < 0) {
            speedX = speedX * -1;
        }
    }
    if(spelerY >= 695) {
        if(speedY > 0) {
            speedY = speedY * -1;
        }
    } else if(spelerY <= 25) {
        if(speedY < 0) {
            speedY = speedY * -1;
        }
    }
    
    //Scoren ofzo
    setTimeout(() => {
        if(speedX < 50 && speedY < 50) {
            if((DiffHoleX < 25 && DiffHoleX > -25) && (DiffHoleY < 25 && DiffHoleY > -25)) {
                spelStatus = GESCOORD;
                console.log(spelStatus);
                speedX = 0;
                speedY = 0;
            }
        }
    }, 2000)
}

var CheckMuisInputStart = function() {
    if(mouseX < 400 && mouseX > 240 && mouseY < 420 && mouseY > 300 ) {
        playColor = "000000";
        if(mouseIsPressed) {
            loadCurrentLevel(1);
            return;
        }
    }
    else {
        playColor = "ffffff";
    }
}

//Gescoord menu
var TekenGescoordMenu = function() {
    fill("#004d00");
    rect(175, 125, 930, 470, 20);
    fill("white");
    textSize(100);
    textFont("Impact");
    //@ts-ignore
    textAlign(CENTER);
    //@ts-ignore
    text(ScoreText, 640, 250);
}

//Start menu
var TekenStartMenu = function() {
    fill("white");
    textSize(100);
    textFont("Impact");
    //@ts-ignore
    textAlign(CENTER);
    stroke("black")
    strokeWeight(1);
    //Text
    //@ts-ignore
    text("Minigolf", 640, 150);
    textSize(25);
    //@ts-ignore
    text("How to play",940 , 275);
    textSize(18);
    //@ts-ignore
    text("Click and drag the ball to launch it", 940, 325);
    textSize(80);
    //@ts-ignore
    fill(playColor - "");
    //@ts-ignore
    text("Play", 320, 400)
    fill("white");
    
    //Leuk plaatje
    strokeWeight(15);
    stroke(255, 255, 255);
    ellipse(960, 475, 25, 25);
    line(960, 475, 1100, 375);
    stroke("Black");
    ellipse(820, 575, 15, 15);
    stroke("white");
    ellipse(820, 575, 12, 12);
    strokeWeight(1);
}

//Berekenen
var berekenLijnX = function() {
    if(mouseX < spelerX) {
        puntX = (spelerX - mouseX) + spelerX;
    }
    else {
        puntX = spelerX - (mouseX - spelerX);
    }
}
var berekenLijnY = function() {
    if(mouseY < spelerY) {
        puntY = (spelerY - mouseY) + spelerY;
    }
    else {
        puntY = spelerY - (mouseY - spelerY);
    }
}

var berekenDiff = function() {
    diffX = spelerX - mouseX;
    diffY = spelerY - mouseY;
    DiffHoleX = spelerX - holeX;
    DiffHoleY = spelerY - holeY;
}

var BerekenInputsGescoord = function() {
    fill("white");
    textSize(80);
    textFont("Impact");
    //@ts-ignore
    textAlign(CENTER);
    stroke("black")
    strokeWeight(1);
    //@ts-ignore
    fill(playColor - "");
    //@ts-ignore 
    text("Next level",640 ,432)
    fill("white");

    if(mouseX < 850 && mouseX > 425 && mouseY < 435 && mouseY > 360 ) {
        playColor = "000000";
        if(mouseIsPressed) {
            NextLevel();
        }
    }
    else {
        playColor = "ffffff";
    }
}

var NextLevel = function() {
    spelerX = 0; 
    spelerY = 0; 
    spelerInHole = 0;
    holeX = 0;
    holeY = 0;
    shotCount = 0;
    currentLevel = currentLevel + 1;
    setTimeout(() => {
       loadCurrentLevel(currentLevel); 
    }, 500);
}


var loadCurrentLevel = function(i) {
        if(i = 1) {
            par = 3;
            spelerX = 1200;
            spelerY = 300;
            holeX = 400;
            holeY = 400;
            setTimeout(() => {
                spelStatus = SPELEN;
                
            }, 500);
            return;
        }
        else if(i = 2) {
            par = 2;
            spelerX = 1200;
            spelerY = 100;
            holeX = 1200;
            holeY = 620;
            setTimeout(() => {
                spelStatus = SPELEN;
            }, 500);
            return;
        }
        else if(i = 3) {
            par = 4;
            spelerX = 128;
            spelerY = 72;
            holeX = 1200;
            holeY = 360;
            setTimeout(() => {
                spelStatus = SPELEN;
            }, 500);
            return;
        }
}

//Deze functie is wack, maar er was geen betere optie lol
var berekenScoreText = function() {
    if(shotCount === 1) {
        ScoreText = "Hole in one!";
    }
    else if (par - shotCount === 0) {
        ScoreText = "Par";
    }
    else if(shotCount < par) {
        if (par - shotCount === 1) {
            ScoreText = "Birdie";
        }
        else if (par - shotCount === 2) {
            ScoreText = "Eagle";
        }
        else if (par - shotCount === 3) {
            ScoreText = "Albatross";
        }
    }
    else if (shotCount > par) {
        if (shotCount - par === 1) {
            ScoreText = "Bogey";
        }
        else if (shotCount - par === 2) {
            ScoreText = "Double Bogey";
        }
        else if (shotCount - par === 3) {
            ScoreText = "Triple Bogey";
        }
        else if (shotCount - par === 4) {
            ScoreText = "Quadruple Bogey";
        }
        else if (shotCount - par === 5) {
            ScoreText = "Quintuple Bogey";
        }
    }
}

//Achtergrond
function setup() {
  createCanvas(1280, 720);
}

//Draw functie lmao
function draw() {
  switch (spelStatus) {
    case START:
        background("green");
        TekenStartMenu();
        CheckMuisInputStart();
    break;

    case SPELEN:
    clear();
    background("green");

    berekenLijnX();
    berekenLijnY();
    berekenDiff();
    berekenScoreText();

    muisInputLijn();

    beweegSpeler();
    tekenHole(holeX, holeY);
    tekenSpeler(spelerX, spelerY);

    
    if(LijnTekenen === 1) {
        strokeWeight(25);
        tekenLijn(spelerX, spelerY, puntX, puntY);
        strokeWeight(1);
    }
    
    /*Debug lol
    fill("white");
    text(("" + shotCount) + ScoreText, 10, 10, 100, 100)
    */
   
    break;
    case GESCOORD:
        TekenGescoordMenu();
        BerekenInputsGescoord();

    break;
  }
}
