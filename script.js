/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

//Globale variabels
const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 300; 
var spelerY = 300; 

var puntX = 0;
var puntY = 0;
var diffX = 0;
var diffY = 0;
var LijnTekenen = 0;

var score = 0; 

//Functies

var tekenSpeler = function(x, y) {
  fill("white");
  stroke(255, 255, 255);
  ellipse(x, y, 50, 50);
};

var tekenLijn = function(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
}
var tekenPunt = function(x, y) {
   fill("white");
   ellipse(x, y, 2, 2);
}
var muisInputLijn = function() {
    if(mouseIsPressed && diffX < 10 && diffY < 10) {
        LijnTekenen = 1;
    }
    else if(mouseReleased) {
        LijnTekenen = 0;
    }
}

//Puntje berekenen
var berekenLijnX = function() {
    if(mouseX < spelerX) {
        puntX = (spelerX - mouseX) + spelerX;
    }
    else if(mouseX > spelerX){
        puntX = spelerX - (mouseX - spelerX);
    }
}
var berekenLijnY = function() {
    if(mouseY < spelerY) {
        puntY = (spelerY - mouseY) + spelerY;
    }
    else if(mouseY > spelerY){
        puntY = spelerY - (mouseY - spelerY);
    }
}

var berekenDiffX = function() {
    if(mouseX < spelerX) {
        diffX = (spelerX - mouseX);
    }
    else if(mouseX > spelerX){
        diffX = (mouseX - spelerX);
    }
}
var berekenDiffY = function() {
    if(mouseY < spelerY) {
        diffY = (spelerY - mouseY);
    }
    else if(mouseY > spelerY){
        diffY = (mouseY - spelerY);
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
    berekenDiffX();
    berekenDiffY();

    muisInputLijn();

    background("green");

    tekenPunt(puntX, puntY);
    if(LijnTekenen = 1) {
        strokeWeight(25);
        tekenLijn(spelerX, spelerY, puntX, puntY);
        strokeWeight(1);
    }
    tekenSpeler(spelerX, spelerY);

    break;
  }
}
