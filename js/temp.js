var picutreParm = {
  id: 'canvas',
  color: 'rgba(255, 255, 255, 1)',
  minRadius: 2,
  maxRadius: 13,
  minwind: 0.2,
  maxwind: 0.7,
  g: 2,
  shadowColor: 'rgba(255, 255, 255, 1)',
  globalRadius: '100',
  background: '#000',
}
var currentNum = 0;
var currentFrame = 0;

function particalPictureDraw(ele){
  ele.canvas=document.getElementById(ele.id);
  ele.ctx=ele.canvas.getContext('2d');
  boarderwindow = document.getElementById('canvasboarder'),
  ele.canvas.width = boarderwindow.offsetWidth;
  ele.canvas.height = boarderwindow.offsetHeight;
  ele.width = boarderwindow.offsetWidth;
  ele.height = boarderwindow.offsetHeight;
  
  ele.amount = ele.width * ele.height / 2500;
  
  ele.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ele.ctx.fillRect(0, 0, ele.width, ele.height);
  
  animeParticle = new Array();
  animeParticle[0] = new XmasPartical(ele);
  currentNum ++;
  currentFrame ++;
}

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.random() * (max - min) + min;
}

function particleDraw(radius, color, shadowColor, globalRadius){
  var canvasParticle = document.createElement('canvas'),
    particleCtx = canvasParticle.getContext('2d');
  canvasParticle.width = globalRadius * 2;
  canvasParticle.height = globalRadius * 2;
  var half = globalRadius,
    particleGradient = particleCtx.createRadialGradient(half, half, 0, half, half, half);
  particleGradient.addColorStop(0.45, color);
  particleGradient.addColorStop(0.5, shadowColor);
  particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  particleCtx.fillStyle = particleGradient;
  particleCtx.beginPath();
  particleCtx.arc(half, half, half, 0, Math.PI * 2);
  particleCtx.fill();
  return canvasParticle;
}

var XmasPartical = function(info){
  this.info = info;
  this.radius = info.minRadius+info.maxRadius-Math.sqrt(random(info.minRadius*info.minRadius,info.maxRadius*info.maxRadius));
  //this.radius = random(info.minRadius, info.maxRadius);
  
  this.sample = particleDraw(this.radius, this.info.color, this.info.shadowColor, this.radius);
  this.passedtime = 0;
  this.x = random(this.info.width, 0-(this.radius*2));
  this.y = 0-(this.radius*2);
  this.distance = (this.radius-info.minRadius)/(info.maxRadius-info.minRadius);
  this.speedY = (this.distance*0.5 + 0.5)*this.info.g;
  this.speedX = (this.distance*0.5 + 0.5)*random(this.info.minwind, this.info.maxwind);
}

XmasPartical.prototype.draw = function(){
  this.x += this.speedX;
  this.y += this.speedY;
  if(this.x > this.info.width){
    this.x = 0-(this.radius*2);
  }
  if(this.y > this.info.height){
    this.y = 0-(this.radius*2);
    this.x = random(this.info.width, 0-(this.radius*2));
  }
  this.info.ctx.drawImage(this.sample, this.x, this.y);
  this.passedtime ++;
}

function particalAnanimation(){
  animeParticle[0].info.ctx.clearRect(0, 0, animeParticle[0].info.width, animeParticle[0].info.height);
  for(i=0; i<currentNum; i++){
    animeParticle[i].draw();
  }
  if(currentNum < animeParticle[0].info.amount){
    if(animeParticle[0].info.height / (animeParticle[0].info.g / 2) > animeParticle[0].info.amount){
      var FrameAll = animeParticle[0].info.height / (animeParticle[0].info.g / 2);
      var jumpFrame = FrameAll - animeParticle[0].info.amount;
      var jumpFreq = jumpFrame / (FrameAll - jumpFrame);
      if((currentFrame%jumpFreq)<1){
        animeParticle[currentNum] = new XmasPartical(picutreParm);
        currentNum ++;
        //console.log(currentNum);
      }
    }else{
      animeParticle[currentNum] = new XmasPartical(picutreParm);
      currentNum ++;
      //console.log(currentNum);
    }
  }
  window.requestAnimationFrame(particalAnanimation);
  currentFrame++;
}

particalPictureDraw(picutreParm);
particalAnanimation();