/*
p5.js script for Tic Tac Toe
David Norman Diaz Estrada
https://github.com/DavidDZ7/tictactoe
August 2023
*/
background_color="#444444"//[220,25,25];
grid_color='rgba(99,99,99,0.5)'//'#999999'
red_color='rgba(250,90,90,0.5)'
blue_color='rgba(90,90,250,0.5)'
green_color='rgba(90,255,90,0.5)'

var turn=true;//var to alternate every turn between red and blue players
var winner=null;

var grid = [0,0,0,0,0,0,0,0,0]; 
/*grid positions are:
  [0,1,2,
   3,4,5,
   6,7,8]
*/


function setup() {
  //createCanvas(1920,1080);
  createCanvas(windowWidth, windowHeight);
  background(background_color);
  drawGrid();
}

function draw() {
  
}

function drawGrid(){
  W=windowWidth
  H=windowHeight
  strokeWeight(8);
  //stroke('rgba(250,90,90,0.35)');//red1
  stroke(grid_color)//set line's color
  line(0, H/3, W, H/3);//line 1
  line(0, 2*H/3, W, 2*H/3);//line 2
  line(W/3, 0, W/3, H);//line 3
  line(2*W/3,0,2*W/3,H);//line 4
}

function mouseClicked() {
  W=windowWidth
  H=windowHeight
  X=mouseX
  Y=mouseY
  position=identifyMouseInGrid(W,H,X,Y)
  console.log("grid[position]:",grid[position])
  if(winner==null && grid[position]==0){
    draw_player(W,H,turn,position)//Draw either red or blue player
    checkWinner(grid);
    turn=!turn;//negate value so next turn we draw oposite figure (red or blue)
  }
  console.log(grid)
}

function identifyMouseInGrid(W,H,X,Y){
  if (Y<=H/3) {//grid position 0,1,2 (row1)
      if(X<=W/3){return 0}
      else if(X>W/3 && X<2*W/3){return 1}
      else{return 2}
  } else if (Y>H/3 && Y<=2*H/3) {//grid position 3,4,5 (row2)
      if(X<=W/3){return 3}
      else if(X>W/3 && X<2*W/3){return 4}
      else{return 5}
  } else {//grid position 6,7,8 (row3)
      if(X<=W/3){return 6}
      else if(X>W/3 && X<2*W/3){return 7}
      else{return 8}
  }
  
}


function draw_player(W,H,turn,position){
  noFill();
  if (turn){//draw red player
    stroke(red_color);
    player_value=1
  }
  else{//draw blue player
    stroke(blue_color);
    player_value=-1
  }
  
  r=max(windowWidth,windowHeight)*0.10;//ellipse radius
  //Update values in grid:
  switch(position){
    //grid position 0,1,2 (row1)
    case 0: ellipse(W/6, H/6, r, r);grid[0]=player_value; break;
    case 1: ellipse(3*W/6, H/6, r, r);grid[1]=player_value; break;
    case 2: ellipse(5*W/6, H/6, r, r);grid[2]=player_value; break;
    //grid position 3,4,5 (row2)
    case 3: ellipse(W/6, 3*H/6, r, r);grid[3]=player_value; break;
    case 4: ellipse(3*W/6, 3*H/6, r, r);grid[4]=player_value; break;
    case 5: ellipse(5*W/6, 3*H/6, r, r);grid[5]=player_value; break;
    //grid position 6,7,8 (row3)
    case 6: ellipse(W/6, 5*H/6, r, r);grid[6]=player_value; break;
    case 7: ellipse(3*W/6, 5*H/6, r, r);grid[7]=player_value; break;
    case 8: ellipse(5*W/6, 5*H/6, r, r);grid[8]=player_value;
  }

}
  

function checkWinner(grid){
  //check possible wins:
  s1=grid[0]+grid[1]+grid[2];//row1
  s2=grid[3]+grid[4]+grid[5];//row2
  s3=grid[6]+grid[7]+grid[8];//row3
  s4=grid[0]+grid[3]+grid[6];//col1
  s5=grid[1]+grid[4]+grid[7];//col2
  s6=grid[2]+grid[5]+grid[8];//col3
  s7=grid[0]+grid[4]+grid[8];//diagonal 1
  s8=grid[2]+grid[4]+grid[6];//diagonal 2
  
  wins=[s1,s2,s3,s4,s5,s6,s7,s8];
  
  var i;
  for (i = 0; i < 8; i++) { 
     if(wins[i]==3){console.log('RED WINS!');winner='red';}
     else if(wins[i]==-3){console.log('BLUE WINS!');winner='blue';}
  } 

  if (!grid.includes(0) && winner==null){
    winner='Draw';
  }

  //Display result on screen:
  if (winner!=null){
    if (winner=='red'){ s = 'RED WINS!'; stroke(red_color);}
    else if (winner=='blue'){ s = 'BLUE WINS!'; stroke(blue_color);}
    else{s="DRAW!"; stroke(green_color)}
    fill(20);
    strokeWeight(4) 
    textSize(40);
    winnerTextWidth=150
    winnerTextHeight=100 
    text(s, windowWidth/2-winnerTextWidth/2, windowHeight/2-winnerTextHeight/2-20,windowWidth/2+winnerTextWidth/2, windowHeight/2+winnerTextHeight/2); // Text wraps within text box
  }
  
}

/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(background_color);
  drawGrid();
  grid = [0,0,0,0,0,0,0,0,0];//restart game
  winner=false;
}
*/