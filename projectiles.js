class Projectile{
constructor(){
  this.r = 15
this.x = player.x;
this.y = player.y - player.r / 2;
this.speed = 35;

}
  display(){
    stroke(3);
    fill(125,255,215);
  ellipse(this.x,this.y,this.r, this.r);
  }
  move(){
this.y -= this.speed;



  }
}
