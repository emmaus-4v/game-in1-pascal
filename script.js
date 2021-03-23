/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

//Globale variabels
const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; 
var spelerY = 100; 

var puntX = 0;
var puntY = 0;

var score = 0; 

//Functies

var tekenSpeler = function(x, y) {
  fill("white");
  ellipse(x, y, 50, 50);
};

var tekenPunt = function(x, y) {
   fill("white");
   ellipse(x, y, 2, 2);
}
var tekenLijn = function(x1, y1, x2, y2) {
    fill("white");
    strokeWeight(25);
    line(x1, y1, x2, y2);
    strokeWeight(1);
}

var berekenLijnX = function() {
    if(mouseX < spelerX) {
        puntX = (spelerX - mouseX) + spelerX
    }
    else if(mouseX > spelerX){
        puntX = spelerX - (mouseX - spelerX)
    }
}

var berekenLijnY = function() {
    if(mouseY < spelerY) {
        puntY = (spelerY - mouseY) + spelerY
    }
    else if(mouseY > spelerY){
        puntY = spelerY - (mouseY - spelerY)
    }
}

//Achtergrond
function setup() {
  createCanvas(1280, 720);
}

//Draw functie lmao
function draw() {
  switch (spelStatus) {
    case SPELEN:
      
    berekenLijnX();
    berekenLijnY();

    background("green");
    tekenPunt(puntX, puntY);
    tekenLijn(spelerX, spelerY, puntX, puntY);
    tekenSpeler(spelerX, spelerY);

  }
}
