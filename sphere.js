/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/

const cellSize = 0.5;
let displacement = 0;
let dFactor = 50;
let nFactor = 0.01;
let rotationXratio = 0;
let rotationYratio = 0;
let shape = 0;
let pgSphere;
function setupSphere() {
  pgSphere = createGraphics(940, 1050, WEBGL);
  pgSphere.noStroke();
}


function drawSphere() {
  background(0, 100);
  pgSphere.background(0, 3);

  //Edit these to change how fast sphere turns
  pgSphere.rotateX(rotationXratio);
  pgSphere.rotateY(rotationYratio);
  //Number of points on the sphere
  let numPoints = 50;
  //Radius
  let radius = 50;

  //Loop points on the sphere
  for (let i = 0; i < numPoints; i++) {
    for (let j = 0; j < numPoints; j++) {
      //Normalize current point's position to the unit sphere
      let phi = map(i, 0, numPoints, 0, TWO_PI);
      let theta = map(j, 0, numPoints, 0, PI);

      //Calculate the Cartesian coordinates from sphere coordinates
      let x =
        radius * sin(theta) * cos(phi) +
        random(-dFactor * displacement, +dFactor * displacement);
      let y =
        radius * sin(theta) * sin(phi) +
        random(-dFactor * displacement, +dFactor * displacement);
      let z =
        radius * cos(theta) +
        random(-dFactor * displacement, +dFactor * displacement);
      pgSphere.fill(color(R, G, B));

      // Draw a sphere at the current position
      pgSphere.push();
      pgSphere.translate(x, y, z);
      pgSphere.sphere(cellSize);
      pgSphere.pop();
    }
  }
  image(pgSphere, 0, 0);
}

