var canvas_width = 500;
var canvas_height = 500;

var turtle = null;
var logo = null;
var code;
var canvas;
var form;
var sprite;
var textOutput;
var oldcode;
var fast;
var out;
var scale;

function setup() {
  fast = 5;
  /*
  turtle = new DelayTurtle(canvas, sprite, fast, false);
  logo = new Logo();
  logo.setTurtle(turtle);
  logo.setTextOutput(textOutput);
  */
}

function loadProgram(event) {
  console.log(`loading ${event.target.href.split('/').pop()} ...`);
  code.value="";
  fetch(event.target.href)
  .then( response =>  response.text() )
  .then( text => {
    console.log(`...done, ${text.length} chars loaded.`);
    code.value=text;
  });
  event.preventDefault();
}

function init(canvas_id='canvas', text_output_id='textOutput', turtle_id='turtle', link_holder='header p', code_id='code') {
  // console.log(`will set global variables based on: canvas_id=${canvas_id}, turtle_id=${turtle_id}, link_holder=${link_holder}, code_id=${code_id}`);
  canvas = document.getElementById(canvas_id);
  sprite = document.getElementById(turtle_id);
  textOutput = document.getElementById(text_output_id);
  code = document.getElementById(code_id);
  links = document.querySelectorAll(`${link_holder} a`);
  // console.log(`searching for links: '${link_holder} a', found ${links.length}`);
  for(let l of links) {
    l.addEventListener('click', loadProgram);
  }


  scale = window.devicePixelRatio;
  // console.log(`creating a canvas with ${canvas_width} x ${canvas_height} css pixels at devicePixelRatio ${window.devicePixelRatio}`);

  // set to real pixels - will never be used again!
  canvas.width = canvas_width * scale;
  canvas.height = canvas_height * scale;
  let ctx = canvas.getContext('2d');
  ctx.scale(scale,scale)

  // set style to virtual pixels, we will work with virtual pixels from now on
  canvas.style.width = canvas_width + "px";
  canvas.style.height = canvas_height + "px";

  setup();
  // console.log(`global variables set: canvas=${canvas}, form=${form}, textOutput=${textOutput}, sprite=${sprite}, oldcode=${oldcode}`);
  // console.log(`global variables set: logo=${logo}, turtle=${turtle}`);

}

function run(speed, drawbits) {
  // console.log(`run speed=${speed}, drawbits=${drawbits}: turtle=${turtle}, logo=${logo}, code=${code}`);
  // turtle.stop();
  if (speed !== fast) {
    fast = speed;
    /*
    var newturtle = new DelayTurtle(canvas, sprite, fast, drawbits);
    logo.setTurtle(newturtle);
    turtle = newturtle;
    */
  }

  /*
  out = logo.run(form.code.value);

  if (out && out.type === "error") {
    alert(out.data);
    setup();
  }
  */
}

function stop() {
  if(turtle) turtle.stop();
}

function clearcanvas() {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(0, 0, 500, 500);
  textOutput.innerHTML = "";
}

function turtle_setup() {
  if(turtle) turtle.turtle.setup();
}
