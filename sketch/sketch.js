class Circle { //modified from class example to only use move function with no display needed
  constructor(x, y, size, xSpeed, ySpeed, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color;
  }
  move() {
    this.x += this.xSpeed;
    if (this.x > (width - this.size / 2) || this.x < 0 + this.size / 2) {
      this.xSpeed *= -1;
    }
    this.y += this.ySpeed;
    if (this.y > height - this.size / 2 || this.y < 0 + this.size / 2) {
      this.ySpeed *= -1;
    }
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
}

var circles = []; //array to hold circles
var currentColor; //hold current coler slider HSB value

function setup() {
  colorMode(HSB, 255); //so i can have one color slider instead of 3 for rgb
  createCanvas(650, 600);

  circleDiv = createDiv(); //div for setting up new circle to add
  circleDiv.style('border-style', 'solid');
  circleDiv.style('height', '270px');
  circleDiv.style('width', '465px');
  circleDiv.position(700, 100);

  blendDiv = createDiv(); //div to change blend mode
  blendDiv.style('border-style', 'solid');
  blendDiv.style('height', '100px');
  blendDiv.style('width', '465px');
  blendDiv.position(700, 400);

  colorDiv = createDiv().parent(circleDiv); //create + style color slider div
  colorDiv.style('height', '100px');
  colorDiv.style('width', '450px');
  colorDiv.style('border-style', 'dashed');
  colorText = createElement('p', 'Color Slider').parent(colorDiv);
  colorSlider = createSlider(0, 255, 127).parent(colorDiv);
  colorSlider.style('width', '400px');

  sizeDiv = createDiv().parent(circleDiv); //create + style size slider div
  sizeDiv.style('height', '100px');
  sizeDiv.style('width', '450px');
  sizeDiv.style('border-style', 'dashed');
  sizeText = createElement('p', 'Size Slider').parent(sizeDiv);
  sizeSlider = createSlider(20, 150).parent(sizeDiv);
  sizeSlider.style('width', '400px');

  addCircleButton = createButton('Add Circle').parent(circleDiv); //add new circle
  addCircleButton.style('font-size', '20pt');
  addCircleButton.mousePressed(addCircle);

  blendText = createElement('p', 'Change Blend Mode').parent(blendDiv);

  addBlend = createButton('Add').parent(blendDiv); //button to change to add mode
  addBlend.style('font-size', '15pt');
  addBlend.mousePressed(blendAdd);

  lightestBlend = createButton('Lightest').parent(blendDiv); //button to change to lightest mode
  lightestBlend.style('font-size', '15pt');
  lightestBlend.mousePressed(blendLightest);

  differenceBlend = createButton('Difference').parent(blendDiv); //button to change to difference mode
  differenceBlend.style('font-size', '15pt');
  differenceBlend.mousePressed(blendDifference);

  for (i = 0; i < 4; i++) { //create some circles to start with
    circles.push(new Circle(random(75, width), random(75, height),
      random(20, 150), random(1, 4), random(1, 4), [random(255), 255, 255]));
  }
}

function draw() {
  clear();
  background(0);
  noStroke();
  for (i = 0; i < circles.length; i++) { //for all circles that exist-- move()
    circles[i].move();
  }
  currentColor = ([colorSlider.value(), 255, 255]); //get HSB color value
  fill(currentColor);
  circle(75, 100, sizeSlider.value()); //preview circle
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text('new circle preview', 80, 20);
}

function addCircle() { //create new circle object
  circles.push(new Circle(random(75, width), random(75, height),
    sizeSlider.value(), random(1, 4), random(1, 4), currentColor));
}

function blendAdd() { //self explanatory lol
  blendMode(ADD);
}

function blendLightest() {
  blendMode(LIGHTEST);
}

function blendDifference() {
  blendMode(DIFFERENCE);
}
