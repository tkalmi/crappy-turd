const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const backgroundImage = new Image();
backgroundImage.src = 'public/background.png'; // From https://www.freepik.com/free-vector/game-ground-texture-summer-landscape_31095380.htm#query=game%20background&position=14&from_view=keyword&track=ais&uuid=4c6c4914-7093-4c49-a0fb-e0e7e4db2c8d

const bgScale = canvas.height / backgroundImage.height;

let dx = 0;

function draw(dt: number) {
  dx += dt / 2;
  dx %= backgroundImage.width;
  context.clearRect(0, 0, canvas.width, canvas.height);
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
}

let lastTimestamp = 0;
function step(timestamp: number) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  draw(dt);
  requestAnimationFrame(step);
}

requestAnimationFrame(step);
