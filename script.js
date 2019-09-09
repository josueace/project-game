var myObstacles = [];
var img = new Image();	
var imgMisile=	new Image();
var myMisiles=[];
var apikey

//https://stackoverflow.com/questions/22097747/how-to-fix-getimagedata-error-the-canvas-has-been-tainted-by-cross-origin-data



const carImg=new Image();	
var canvas1 = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');

var ctx = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');


var cnt=0;
var termina;
var strDataURI=null;
var canUpdate=false;

var sec=[];

for (let i=0;i<5;i++)
sec.push({x:120,y:0});

for (let i=0;i<5;i++)
sec.push({x:120,y:60});

for (let i=0;i<5;i++)
sec.push({x:120,y:120});

for (let i=0;i<5;i++)
sec.push({x:120,y:180});

for (let i=0;i<5;i++)
sec.push({x:120,y:0});

for (let i=0;i<5;i++)
sec.push({x:120,y:60});

for (let i=0;i<5;i++)
sec.push({x:120,y:120});

for (let i=0;i<10;i++)
sec.push({x:120,y:60});
for (let i=0;i<10;i++)
sec.push({x:120,y:0});

for (let i=0;i<5;i++)
sec.push({x:120,y:0});

for (let i=0;i<5;i++)
sec.push({x:120,y:60});

for (let i=0;i<5;i++)
sec.push({x:120,y:120});
  
var seccnt=0;  


function setImgData(){
   ctx2.clearRect(0, 0, 640, 640);
   ctx2.drawImage(img,  0,0);
   canUpdate=true;
   cnt++;
	
	if (cnt>13360) {
		  clearInterval(termina);
		  
	  }
  
}

var backgroundImage = {
  
  y: 0,
  speed: 0.0005,
  lat:40.7508,
  lon:-73.9859,
  zoom:18,
  groundType:'map',
  satellite:'satellite',
 
  
  
  update:function(){
	  if (myGameArea.status==="stop"){
      clearInterval(termina);
	  return;
	  };
	
    
    this.lat += this.speed;
	img.onload = setImgData;

	if (this.satellite==='satellite')	
	var mapurl="http://maps.google.com/maps/api/staticmap?"+
	"&zoom="+this.zoom+
	"&key=AIzaSyC9cY9cZ9m49kEl5ZvvaSgWnEfSdgso"+apikey.value.trim()+
	"&maptype=satellite"+
	"&sensor=true"+
	"&center="+this.lat+","+this.lon+
	"&size=640x640";	
	else
	var mapurl="http://maps.google.com/maps/api/staticmap?"+
	"&zoom="+this.zoom+
	"&key=AIzaSyC9cY9cZ9m49kEl5ZvvaSgWnEfSdgso"+apikey.value.trim()+
	"&sensor=true"+
	"&center="+this.lat+","+this.lon+
	"&size=640x640";
	
	console.log(mapurl);
	
	if (this.groundType==='static')
	  img.src=    "images/sky6.jpg"; 
    else
     img.src=mapurl;  
  },
  
  move: function() {
    if (this.groundType==='static'){
     this.y += 1;
     this.y %= canvas.height;
	}
  },

  draw: function() {
   if (this.groundType==='static'){	  
    ctx.drawImage(img,  0,this.y);
	 if (this.speed < 0) {
       ctx.drawImage(img, 0,this.y + canvas.height );
     } else {
       ctx.drawImage(img, 0,this.y -  canvas.height);
	
    }
   }
	
  },
};

function updateCanvas() {
  myGameArea.frames += 1;
  
	 
  
  
 if (canUpdate){
	 
   ctx.clearRect(0, 0, canvas1.width, canvas1.height);
   backgroundImage.move();
   backgroundImage.draw();
   updateGameArea();
  }
   
   if (myGameArea.status!=="stop")
   {
	   
  requestAnimationFrame(updateCanvas);
    }
     else
	 {
	   
		myObstacles=[];
		myGameArea.status="";
	document.getElementById('game-board').style.display = "none";
	document.getElementById('info').style.display = "block";
	location.reload();

	 }
  
 
}




var myGameArea = {
   
  frames: 0,
  points:0,
  prepare: function() {
	var ele=document.getElementById('message');
	ele.style.display='none';
  },
  start: function() {
	apikey=document.getElementById('apikey'); 
	
	this.frames=0;
    this.status="continue";	
	backgroundImage.update();  
	updateCanvas();
	termina=setInterval(()=> backgroundImage.update(),400);
  },
  
  stop: function() {
    this.status="stop";
	this.frames= 0;
  },
  score: function() {
    ctx.font = "24px serif";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + this.points, 50, 50);
	 ctx.font = "24px serif";
	 ctx.fillStyle = "red";
    ctx.fillText("height: " + backgroundImage.zoom, 500, 50)
  }
};

class Component {
  constructor(width,height, type, x, y) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
	this.fire=false;
	this.dead=false;
	this.almostDead=false;
	
  }

 
  die(){
	  
  	  if (!this.dead){ 
	   this.almostDead=true;
	   var migimg = new Image();
	   migimg.src = "images/boom.png";  
       ctx.drawImage(migimg, sec[seccnt].x,sec[seccnt].y, 60, 60 ,this.x-80,this.y-50, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 60,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	   seccnt++;
	   if (seccnt==sec.length){
	      seccnt=0;
		  this.dead=true;
		   myGameArea.points+=10;
    	  this.x=0;
	     this.y=0;

	   }
	  }

  }
  
  shoot()                                     
  {
	    

  var misile = new Component(20,60, "misile", player.x+40,player.y);	
   myMisiles.push(misile);
  
  
  //for (i = 0; i < myObstacles.length; i++) {
	//seccnt=0;
	//if (myObstacles.length>0)
  //  myObstacles[myObstacles.length-1].die();
//	 break; 
 // }
  
  
  }
  
  diePlayer()    {
	  if (!this.dead){ 
	   this.almostDead=true;
	   carImg.src = "images/boom.png";  
       ctx.drawImage(carImg, sec[seccnt].x,sec[seccnt].y, 60, 60 ,this.x-80,this.y, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 60,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	
	   seccnt++;
	   if (seccnt==sec.length){
	      seccnt=0;
		  this.dead=true;
	   }
	  }
	   // else
		 // this.die();
	
  }
  
  die4()    {
	  if (!this.dead){ 
	   this.almostDead=true;
	   carImg.src = "images/boom.png";  
       ctx.drawImage(carImg, sec[seccnt].x,sec[seccnt].y, 60, 60 ,this.x-80,this.y, this.width+100, this.height+100);
	 // ctx.drawImage(carImg, 60,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	
	
	 //  ctx.drawImage(carImg, 60,40   , 60, 80 ,this.x-80,this.y-100, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 120,0, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 120,120, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 120,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 60,0, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 60,60, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	 //  ctx.drawImage(carImg, 60,120, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100)
	//   ctx.drawImage(carImg, 60,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 0,0, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 0,60, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 0,120, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	//   ctx.drawImage(carImg, 0,180, 60, 100 ,this.x-80,this.y, this.width+100, this.height+100);
	
	   seccnt++;
	   if (seccnt==sec.length){
	      seccnt=0;
		  this.dead=true;
	   }
	  }
	   // else
		 // this.die();
	
  }
  
  draw(){
  //  if (!this.almostDead){ 
   if (!this.almostDead){ 
	   carImg.src = "images/usaf15.png"; 
       ctx.drawImage(carImg, this.x, this.y , this.width, this.height);
	  }
	    else
		  this.diePlayer();
	
  }
  //draw2(){
	//  alert('call draw2');
	 //  carImg.src = "images/usaf15.png"; 
	 //  var that=this;
     //  carImg.onload=function(){	   
     //  ctx.drawImage(carImg, that.x, that.y , this.width, this.height);
	 //  }
	  
 // } 
  
  drawMisiles(){
	this.y-=2;
	
     imgMisile.src = "images/misile.png";   
    // ctx.drawImage(imgMisile, 0,400, 0, 400 ,this.x,this.y, this.width, this.height);
	 ctx.drawImage(imgMisile, this.x, this.y , 20, 60);
  
 }
  
  update() {
	      if (!this.almostDead){
	       var migimg = new Image();
	       migimg.src = "images/mig8.png"; 
	       ctx.drawImage(migimg, this.x, this.y , this.width, this.height);
		  }
		  else
			  this.die();
		  
	     //  migimg.onload=function(){
		 //  ctx.drawImage(migimg, that.x, that.y , 100, 100);
	   //}
   
  }

  newPos() {
    this.x += this.speedX;
    if (this.x<0)
		 this.x=0;
    this.y += this.speedY;
	if (this.x>680)
		this.x=680;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
	var ret=  
    !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
	if (ret){
		if (this.type==='player')
		 this.diePlayer();
	    else
			this.die ();
		 
	 
	}
	
	
  }
}


var player = new Component(75, 75, "player", 300,470);

function updateGameArea() {

  // update the player's position before drawing
  player.newPos();
 
  player.draw();
  
  // update the obstacles array
   updateObstacles();
   updateMisiles();
  
  
  
  // check if the game should stop
  checkGameOver();
  // update and draw the score
 myGameArea.score();
  
}


document.onkeydown = function(e) {
	
	
	
  switch (e.keyCode) {             
	 case 16: // 
	 backgroundImage.groundType='static';
     backgroundImage.satellite='';
     break;	
    case 17: // 
	 backgroundImage.groundType='map';
	 if (backgroundImage.satellite==='')
		 backgroundImage.satellite='satellite';
	 else
		 backgroundImage.satellite='';
     break;		
    case 32: // left arrow
     player.shoot();
     break;	  
	  
    case 37: // left arrow
      player.x -= 10;
	  backgroundImage.lon-=0.001;
      break;
    case 39: // right arrow
      player.x += 10;
	  backgroundImage.lon+=0.001;
      break;
   case 38: // up arrow
      backgroundImage.zoom-=1;
	  
	  if (backgroundImage.zoom<10)
	    backgroundImage.zoom=10;
		if (player.width>=75){
	      player.width-=10;
	      player.height-=10;
	    }  
	 	
	 
      break;
    case 40: // down arrow
        backgroundImage.zoom+=1;
	 
			if (player.width<=100){
	      player.width+=10;
	      player.height+=10;
	     }  
	
	
      break;	  
	  
	  
  }
};

document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;
};

function updateMisiles(){
	
 for (i = 0; i < myMisiles.length; i++) {
    myMisiles[i].y -= 2// increase speed
    myMisiles[i].drawMisiles();
  }
  
    myMisiles.some(function(misile) {
 	 myObstacles.some(function(obstacle) {
       obstacle.crashWith(misile);
    });; 

    })
  
  
}

function updateObstacles() {
	
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].y += 1;// increase speed
    myObstacles[i].update();
  }

  myObstacles.some(function(obstacle) {
       player.crashWith(obstacle);
    });

 
 
  if (myGameArea.frames % 200 === 0) {
	 
	 
    var y = canvas1.height;
    var minWidth = 20;
    var maxWidth = 500;
   
	var x= Math.floor(
      Math.random() * (maxWidth - minWidth + 50) + minWidth
    );
    myObstacles.push(new Component(75, 75, "obstacle", x, 0));
	
	 
	
   
  }
}

function checkGameOver() {

  if (player.dead) {
	document.getElementById('game-board').style.display = "none";
    myGameArea.stop();
	
  }
}

function drawCanvas1()
{
    var frontCanvas = document.getElementById('frontCanvas');
    var context = frontCanvas.getContext('2d');
	
	context.font = "30px Arial";
    context.strokeText("Hello World",100,50);
	
    var myGradient = context.createLinearGradient(0, 0, 0, 60);
    myGradient.addColorStop(0, 'red');
    myGradient.addColorStop(1, 'white');
	context.globalAlpha = 0.4;
	context.lineCap ="round";
    context.fillStyle = myGradient;
    context.fillRect(180, 400, 200, 50);
	context.fillStyle    = 'red';
    context.textBaseline = 'top';
    context.font         = 'bold 30px sans-serif';
    context.fillText('Start Game', 190, 410);
    
	context.fillStyle    = 'red';
    context.font         = 'bold 35px sans-serif';
    context.fillText('World of Planecraft', 170, 100);
	
	 
	context.fillStyle    = 'white';
    context.font         = 'bold 20px sans-serif';
    context.fillText('Use up/down keys to ascend/descend', 100, 460);
	context.fillText('Use left/right keys to turn left or right', 100, 490);
	context.fillText('Use ctrl/shift to change background type', 100, 520);
	context.fillText('Use space bar to shoot', 100, 550);
	
	
	

}


window.onload = function() {
   drawCanvas1();
   myGameArea.prepare;
   document.getElementById("frontCanvas").onclick = function() {
   document.getElementById('info').style.display = "none";
   document.getElementById('game-board').style.display = "block";
   document.getElementById('mykey').style.display = "none";
   myGameArea.start();
  };
  
};
