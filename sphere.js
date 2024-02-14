/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;
const CCSLIDER9 = 86;
let myController;
const cellSize = 0.5;
let displacement = 0;
let dFactor = 50;
let nFactor = 0.01;
let rotationXratio = 0;
let rotationYratio = 0;
let shape = 0;
// var backgroundColour = "#000000";
// let noiseScale =  100;
let pgSphere;
function setupSphere() {
  pgSphere = createGraphics(940, 1050, WEBGL);
  pgSphere.noStroke();

  WebMidi.enable()
    .then(onStart)
    .catch((err) => alert(err));
}
// gets called by MIDI library once MIDI enabled
function onStart() {
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
    console.log("No device detected.");
  } else {
    WebMidi.inputs.forEach((device, index) => {
      console.log(`${index}: ${device.name}`);
    });
  }
  myController = WebMidi.inputs[0];
  myController.channels[1].addListener("noteon", noteOn);
  myController.channels[1].addListener("controlchange", allCC);
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
      // let x = (radius * sin(theta) * cos(phi)) + (noise(x*0.01,y*0.01));
      // let y = (radius * sin(theta) * sin(phi)) //+ (noise(x,y,z)*dFactor);
      // let z = (radius * cos(theta)) //+ (noise(x,y,z) * dFactor);

      //Apply noise
      // let c = map(noise(x * noiseScale, y * noiseScale, z * noiseScale),  0,  1,  0,  255);
      //fill(c);
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

let R;
let G;
let B;

// gets called when a MIDI note its intercepted
function noteOn(e) {
  // for APC Mini
  // console.log(e.note.name, e.note.accidental || null, e.note.octave);
  // calculate the postion of the note in the grid of notes
  let pos = returnXY(e.note.name, e.note.accidental || "", e.note.octave);
  // calculate the x y pixel equivalent
  // add offset values to position in the middle of an notional 8 x8 grid cell
  // width / 16 = half of cell size
  let hSpace = width / 16;
  let vSpace = height / 16;
  let x = pos.x * width + hSpace;
  let y = pos.y * height + vSpace;
  // TODO - use these values to draw something at the note position?
  // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
//   console.log('moving slider', e.controller.number, e.data);
  let ratio = e.data[2] / 127;
  switch (e.controller.number) {
    case CCSLIDER1: {
      R = 255 * ratio;
      break;
    }

    case CCSLIDER2: {
      G = 150 * ratio;
      break;
    }
    case CCSLIDER3: {
      B = 75 * ratio;
      break;
    }
    case CCSLIDER4: {
      rotationYratio = (PI / 16) * ratio;
      break;
    }

    case CCSLIDER5: {
      rotationXratio = (PI / 16) * ratio;
      break;
    }

    case CCSLIDER6: {
      displacement = ratio;
      break;
    }
    case CCSLIDER7: {
      
      break;
    }

    case CCSLIDER8:
      break;
    case CCSLIDER9:
      break;
  }
}
