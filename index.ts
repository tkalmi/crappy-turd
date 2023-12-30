const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const backgroundImage = new Image();
backgroundImage.src = 'public/background.png';
const bird1 = new Image();
bird1.src = 'public/bird_1.png';
const bird2 = new Image();
bird2.src = 'public/bird_2.png';
const bird3 = new Image();
bird3.src = 'public/bird_3.png';
const bird4 = new Image();
bird4.src = 'public/bird_4.png';

const BIRD_HEIGHT = canvas.height / 10;
const BIRD_X = BIRD_HEIGHT * 1.5;

const bgScale = canvas.height / backgroundImage.height;

let dx = 0;
let birdY = canvas.height / 2 - BIRD_HEIGHT / 2;
let birdSpeedY = 0;
let lastFlapAgo = Infinity;

function drawImage(
  image: HTMLImageElement,
  x: number,
  y: number,
  scale: number,
  rotation: number
) {
  context.setTransform(scale, 0, 0, scale, x, y);
  context.rotate(rotation);
  context.drawImage(image, -image.width / 2, -image.height / 2);
  context.setTransform(1, 0, 0, 1, 0, 0);
}

function draw(dt: number) {
  dx += dt / 2;
  dx %= backgroundImage.width;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImage(backgroundImage, -dx, 0, 1, 0);
  context.drawImage(
    backgroundImage,
    dx,
    0,
    backgroundImage.width,
    backgroundImage.height,
    0,
    0,
    backgroundImage.width * bgScale,
    backgroundImage.height * bgScale
  );
  // drawImage(backgroundImage, backgroundImage.width - dx - 2, 0, 1, 0);
  context.drawImage(
    backgroundImage,
    dx - backgroundImage.width + 2,
    0,
    backgroundImage.width,
    backgroundImage.height,
    0,
    0,
    backgroundImage.width * bgScale,
    backgroundImage.height * bgScale
  );
  // Draw bird shadow
  const shadowScale = birdY / (canvas.height - 98);
  context.beginPath();
  context.ellipse(
    BIRD_X,
    canvas.height - 70,
    54 * (1.5 - shadowScale),
    20 * (1.5 - shadowScale),
    0,
    0,
    Math.PI * 2
  );
  context.fillStyle = `rgba(0, 0, 0, ${shadowScale * 0.5})`;
  context.fill();

  // Draw bird
  const birdAngle = (Math.max(-600, Math.min(600, -birdSpeedY)) / 600) * 50;
  const bird = (() => {
    if (lastFlapAgo < 30) {
      return bird2;
    } else if (lastFlapAgo < 60) {
      return bird3;
    } else if (lastFlapAgo < 90) {
      return bird4;
    } else {
      return bird1;
    }
  })();
  drawImage(
    bird,
    BIRD_X,
    birdY,
    BIRD_HEIGHT / bird.height,
    birdAngle * (Math.PI / 180)
  );
}

let keysDown: Record<string, boolean> = {};
let spaceNeedsHandling = false;
let looping = true;

let lastTimestamp = 0;

function step(timestamp: number) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  lastFlapAgo += dt;
  // Thrust upwards
  if (keysDown['Space'] && spaceNeedsHandling) {
    birdSpeedY = Math.min(birdSpeedY + 600, 600);
    spaceNeedsHandling = false;
    lastFlapAgo = 0;
  }
  // Gravity
  birdY -= (birdSpeedY * dt) / 1_000;
  birdY = Math.max(46, birdY);
  // Hit the floor or ceiling
  if (canvas.height - birdY <= 100 || birdY <= 46) {
    looping = false;
    canvas.classList.add('game-over');
  }
  // Accelerate downwards
  birdSpeedY -= (80 * (9.81 * dt)) / 1_000;
  draw(dt);
  if (looping) {
    requestAnimationFrame(step);
  }
}

function reset() {
  dx = 0;
  birdY = canvas.height / 2 - BIRD_HEIGHT / 2;
  birdSpeedY = 0;
  lastFlapAgo = Infinity;
  spaceNeedsHandling = false;
  looping = true;
  lastTimestamp = performance.now();
}

requestAnimationFrame(step);

addEventListener('keydown', (event) => {
  keysDown[event.code] = true;
  if (event.code === 'Space') {
    spaceNeedsHandling = true;
    if (!looping) {
      canvas.classList.remove('game-over');
      reset();
      requestAnimationFrame(step);
    }
  }
});

addEventListener('keyup', (event) => {
  keysDown[event.code] = false;
});
