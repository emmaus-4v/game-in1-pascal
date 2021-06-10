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

var spelerX = 300; 
var spelerY = 300; 
var spelerInHole = 0;

var holeX = 600;
var holeY = 400;
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

var score = 0; 
var shotCount = 0;
var par = 3;

var ScoreText = "ScoreText";
var playColor = "ffffff";


//Functies

var tekenSpeler = function(x, y) {
    fill("white");
    stroke(255, 255, 255);
    ellipse(x, y, 50, 50);
};

var tekenSpelerInHole = function(x, y) {
    ellipse(x, y, 25, 25);
}

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
    
    //scoren ofzo
    if(speedX < 50 && speedY < 50) {
        if((DiffHoleX < 25 && DiffHoleX > -25) && (DiffHoleY < 25 && DiffHoleY > -25)) {
            spelStatus = GESCOORD;
            spelerInHole = 1;
            console.log(spelStatus);
        }
    }

}

var CheckMuisInputStart = function() {
    if(mouseX < 400 && mouseX > 240 && mouseY < 420 && mouseY > 300 ) {
        playColor = "000000";
        if(mouseIsPressed) {
            spelStatus = SPELEN;
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
    textAlign(CENTER);
    text(ScoreText, 640, 250);
}

//Start menu
var TekenStartMenu = function() {
    fill("white");
    textSize(100);
    textFont("Impact");
    textAlign(CENTER);
    stroke("black")
    strokeWeight(1);
    //Text
    text("Minigolf", 640, 150);
    textSize(25);
    text("How to play",940 , 275);
    textSize(18);
    text("Click and drag the ball to launch it", 940, 325);
    textSize(80);
    fill(playColor - "");
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

var berekenDiffX = function() {
        diffX = spelerX - mouseX;
}
var berekenDiffY = function() {
        diffY = spelerY - mouseY;
}

var berekenDiffHoleX = function() {
    DiffHoleX = spelerX - holeX;
}
var berekenDiffHoleY = function() {
    DiffHoleY = spelerY - holeY;
}

var BerekenInputs

//Deze functie is wack, maar er was geen betere optie
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

    berekenLijnX();
    berekenLijnY();
    berekenDiffX();
    berekenDiffY();
    berekenDiffHoleX();
    berekenDiffHoleY();
    berekenScoreText();

    muisInputLijn();
    background("green")

    beweegSpeler();
    tekenHole(holeX, holeY);
    if(spelerInHole === 0) {
        tekenSpeler(spelerX, spelerY);
    }
    else {
        tekenSpelerInHole(holeX, holeY);
    }
    if(LijnTekenen === 1) {
        strokeWeight(25);
        tekenLijn(spelerX, spelerY, puntX, puntY);
        strokeWeight(1);
    }
    
    //Debug lol
    fill("white");
    text(shotCount + " " + ScoreText, 10, 10, 100, 100)

    break;
    case GESCOORD:
        TekenGescoordMenu();
        BerekenInputs();

    break;
    
  }
}
