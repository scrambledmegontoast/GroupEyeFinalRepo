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
let R;
let G;
let B;
let gradientposIris;

function setupController(){
    console.log("setting up");
    WebMidi.enable()
    .then(onStart)
    .catch((err) => alert(err));   
}

function onStart() {
    console.log("starting");
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
        gradientposIris= 1000*ratio;
      break;
  }
}
