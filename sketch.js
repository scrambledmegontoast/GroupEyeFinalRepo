let previousShape = 0; 

function setup(){
  // setupShare();
  // setupIris();
setupSphere();
}


function draw() {
  
  if (shape === 0) {
    if (shape!=previousShape) {
      setupSphere();
      previousShape = shape; 
    }
    drawSphere();
  }
  else {
    if (shape !=previousShape){
      setupIris();
    previousShape = shape;
    }
    drawIris();
  }
}

