/****************************************************************
 *      Basic Javascrip animation on an HTML5 Canvas
 *      ---------------------------------------------
 
 *      Will load image of a knight and a rocks, and moves the 
 *      rocks across the screen. The background is handled by
 *      CSS, and not in the Javascript (the render is not painting
 *      the background, only the objects - Knight and Rocks) 
 ****************************************************************/


const ANIMATION_PERIOD : number =  1000/20;
const SCREEN_WIDTH : number     =  1000;
const SCREEN_HEIGHT : number    =  1000;




let canvas  : HTMLCanvasElement | null; 
let targetCanvas : HTMLCanvasElement | null;
let ctx : CanvasRenderingContext2D | null;




//let knightImg, rockImg;

let rocks : VideoObject[] = [];
let startTime : number = 0;
let totalUpdates : number = 0;
let frameRate : string = "";

let knightImg : CanvasImageSource;
let rockImg: CanvasImageSource;


class  VideoObject {

    name: string;
    xPos : number; 
    yPos : number; 
    width : number; 
    height : number;
    
    dX : number;
    dY : number;
    active: boolean;

    image : CanvasImageSource;


  constructor( image : CanvasImageSource,xPos : number, yPos : number, width : number, height: number) {
      this.image = image;
      this.xPos = xPos;
      this.yPos = yPos;
      this.width = width;
      this.height = height;

      this.dX = 0;
      this.dY = 0;
      this.active = true;

      this.name = 'Not Defined';
    }

    reset(){
      this.xPos = 0;
      this.yPos = 0;
      this.dX = 0;
      this.dY = 0;
      this.active = false;
      console.log("Video Object been reset: " + this.name );
    }

    update() {

      if ( this.active === false) return;

      this.xPos +=  this.dX;
      this.yPos +=  this.dY;

      if ( this.xPos < 0 ||  this.xPos >= SCREEN_WIDTH  )   this.reset();
      if ( this.yPos < 0 ||  this.yPos >= SCREEN_HEIGHT  )  this.reset();
    }

    draw(context : CanvasRenderingContext2D){

      if ( this.active === false) return;
      context.drawImage(this.image,  
                       this.xPos,  this.yPos,
                       this.width, this.height);
    }

    toString(){
      return ("Name: " + this.name + 
              " [x,y] = " + this.xPos + " , " + this.yPos + 
              "  [dx,dy] = " +  this.dX + " , " + this.dY +
              "  width = " +  this.width + " , height = " + this.height );
    }

};


 function init() {
   console.log("Started Initialisation of animation...");



   var canvas = document.getElementById("graph-canvas") as HTMLCanvasElement;
   if (canvas === null)  return;

//    canvas = document.getElementById('canvas');



   ctx = canvas.getContext('2d');
   canvas.height = window.innerHeight;
   canvas.width = window.innerWidth;

   console.log("Canvas Size [widht, height] = [" + canvas.width + "," + canvas.height + "]");

   //yCircle = canvas.height / 2;

   loadImages();

   let myRock = new VideoObject( rockImg,0,0,40,30 );
   myRock.dX = 18;
   myRock.dY = 24;
   myRock.name = "Down right Rock";
   console.log("\tVideo Object Defined: " + myRock.toString() );
   let myRock2 = new VideoObject( rockImg,400,0,40,30 );
   myRock2.dX = -6;
   myRock2.dY = 10;
   myRock2.name = "Down Left Rock";
   console.log("\tVideo Object Defined: " + myRock2.toString() );

   rocks.push( myRock );
   rocks.push( myRock2 );
   
   console.log( "Initialisation completed" );


   startTime =  Date.now();
   console.log("Start Time: " + startTime );


  //  setInterval( animate, ANIMATION_PERIOD );
   // Use independent timer for the execution of the update and render... 
   setInterval( update, ANIMATION_PERIOD );
   setInterval( render, ANIMATION_PERIOD );


 }




 function loadImages() {

  knightImg = new Image();
  knightImg.onload = function() {
    console.log("Image loaded (Knight)");
  };
  knightImg.src = './img/knight.png';

  
  rockImg = new Image();
  rockImg.onload = function() {
    console.log("Image loaded (Rockt)");
  };
  rockImg.src = './img/rock.png';

  
 }

//  function animate(){

//    update();
//    render();
// }

function update() {

  for (let i=0;i< rocks.length; i++ ){
      rocks[i].update();
    }   
}

function render(){

  if (canvas === null)  return;
  if (ctx === null)  return;

  ctx.clearRect(0,0,canvas.width, canvas.height);

  ctx.drawImage(knightImg, 0, 0);

  for (let i=0;i< rocks.length; i++ ){
    rocks[i].draw(ctx);
  }   

  totalUpdates++;
  if ( startTime === 0) 
    startTime = Date.now();

    

  let timeLasted = (Date.now() - startTime) / 1000;
  frameRate = (totalUpdates / timeLasted).toFixed(1);

  ctx.font = "40px Arial";
  ctx.fillStyle = "red";
  ctx.fillText( frameRate  + " fps",
                             canvas.width-150, 
                              canvas.height-30);
                      

}