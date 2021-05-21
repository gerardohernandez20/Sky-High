'use strict';

let state= 'title';
let cnv;
let points = 1;
let lives = 3;
let w = 540;
let h = 540;
let player;
let coins = [];
let enemies = [];
let projectiles = [];
let playerImg;
let coinImg;
let enemyImg;

let playerSS;
let coinSS;
let playerJSON;
let coinJSON;
let playerAnimation = [];
let coinAnimation = [];
var gif_loadImg, gif_createImg;

function preload(){
gif_loadImg = loadImage("illustration3.gif");
gif_createImg = createImg("illustration.gif");


playerImg = loadImage('assets/slime.png');
coinImg = loadImage('assets/mage.png');
enemyImg = loadImage('assets/potential.png');

playerSS = loadImage('assets/spritesheet.png');
playerJSON = loadJSON('assets/spritesheet.json');

//image for projectile here
}




function setup(){
  cnv = createCanvas(w, h);

  imageMode(CENTER);
textFont('monospace');


let playerFrames = playerJSON.frames;

for(let i = 0; i < playerFrames.length; i++){

let pos = playerFrames[i].frame;
let img = playerSS.get(pos.x, pos.y, pos.w, pos.h);
playerAnimation.push(img);
console.log(playerAnimation);
}


player = new Player();


//coins[0] = new Coin();
coins.push(new Coin());
enemies.push(new Enemy());
projectiles.push(new Projectile());
}

function draw(){
image(gif_loadImg,270, 270);
gif_createImg.position(500,350);
switch(state){
  case 'title':
  title();
  cnv.mouseClicked(titleMouseClicked);
  break;
  case 'level 1':
  level1();
  cnv.mouseClicked(level1MouseClicked);
  break;
  case 'you win!!':
  youWin();
  cnv.mouseClicked(youWinMouseClicked);
  break;
  case 'gameOver':
  gameOver();
  cnv.mouseClicked(gameOverMouseClicked);
  break;
  default:
  break;
}
}
function keyPressed(){
if (keyCode == LEFT_ARROW){
player.direction = 'left'
} else if (keyCode == RIGHT_ARROW) {
player.direction = 'right'
} else if (keyCode == UP_ARROW) {
player.direction = 'up'
} else if (keyCode == DOWN_ARROW) {
  player.direction = 'down'
}else if (key == ' '){
  projectiles.push(new Projectile);
} else if (key = ' '){
  player.direction = 'still';

}

}

function keyReleased (){
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }

  if(numberKeysPressed === 0){
    player.direction = 'still';
}
}

function mousePressed() {
  state = 'level 1'

}
function title(){
  background(230,191,250);
  textSize(120);
  fill(280);
  textAlign(CENTER);
  text('SkyHigh',w/2,h/5);

  textSize(40);
  text('click anywhere to start',w/2,h/2);
}

function titleMouseClicked() {
console.log('canvas is clicked on title page');
state = 'title'
}

function level1(){

//text('click for points',w/2,h-30);
if(random(1) <= 0.01){
coins.push(new Coin());

}
if (random(1) <= 0.04) {
  enemies.push(new Enemy());
}



for (let i = 0; i < projectiles.length; i++){
  projectiles[i].display();
  projectiles[i].move();


}


player.display();
player.move();

//iterating through coin arrays and move em

for (let i = 0; i < coins.length; i++){
  coins[i].display();
  coins[i].move();
}
for (let i = 0; i < enemies.length; i++){
  enemies[i].display();
  enemies[i].move();

//points decreased
if (enemies[i].y >= h - enemies[i].r / 2){
  points--;
  enemies.splice(i, 1);
}

}




for (let i = projectiles.length - 1; i >=0; i--){
//check for collision, if there is a collision increase points by 1 and splice that coin out of array
//need to iterate backwards
for (let j = coins.length - 1; j >= 0; j-- ){
if (dist(projectiles[i].x, projectiles[i].y, coins[j].x, coins[j].y) <=(projectiles[i].r + coins[j].r) /2){
  points++;
  coins.splice(j, 1);
} else if (coins[j].y > h){
  coins.splice(j,1);
}
}






for (let j = enemies.length - 1; j >= 0; j-- ){

if (projectiles[i] && dist(projectiles[i].x, projectiles[i].y, enemies[j].x, enemies[j].y) <=(projectiles[i].r + enemies[j].r) /2){
  points++;

  enemies.splice(j, 1);
  projectiles.splice(i,1);
}
}



}



text(`ponits: ${points}`, w/4, h-30);

if (points >= 50){
  state = 'you win!!';
}else if (points <= 0){
  state = 'gameOver'
}
}

function level1MouseClicked(){

points++;
console.log('points = '+ points);
if (points >=100){
  state = 'you win!!'
}
}


function youWin(){
  background(245,50,90);
  textSize(60);
  stroke(280);
  text('You won!!!!!',w/2,h/2);

  textSize(20);
  text('click anywhere to restart',w/2,h*3/4);
}

function youWinMouseClicked(){
state = 'title';


enemies = [];
projectiles = [];
points = 1;
}

function gameOver(){

  background(245,50,90);
  textSize(60);

if (lives >=0){

  text( `lives left: ${lives}`,w/2,h/2);

  textSize(20);
  text('click anywhere to go back!',w/2,h*3/4);

} else {
  text('Game Over!',w/2,h/2);

  textSize(20);
  text('click anywhere to restart',w/2,h*3/4);
}

}



function gameOverMouseClicked(){
  if (lives >= 0){

lives--;
state = 'level 1'
} else{
  state = 'title';
}
enemies = [];
projectiles = [];
points = 1;
}
