/* Canvas and image assets */

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const startText = document.getElementById('start-game') as HTMLParagraphElement;
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
const pipeImag = new Image();
pipeImag.src = 'public/pipe.png';
const loadingText = document.getElementById('loading') as HTMLParagraphElement;

/******************************************************************************/

/* Audio */

const audioContext = new AudioContext();
type AudioKey = 'mainTheme' | 'flap' | 'pipePassed' | 'death';
const audioLibrary: Partial<Record<AudioKey, AudioBufferSourceNode>> = {};
const gainNodes: Record<AudioKey, GainNode> = {
  mainTheme: audioContext.createGain(),
  flap: audioContext.createGain(),
  pipePassed: audioContext.createGain(),
  death: audioContext.createGain(),
};
gainNodes.mainTheme.gain.value = 0.6;
gainNodes.flap.gain.value = 1;
gainNodes.pipePassed.gain.value = 0.3;
gainNodes.death.gain.value = 0.8;
for (const key of Object.keys(gainNodes) as AudioKey[]) {
  gainNodes[key].connect(audioContext.destination);
}

function playAudio(key: AudioKey, loop: boolean = false) {
  const oldBuffer = audioLibrary[key]!;
  const track = audioContext.createBufferSource();
  track.buffer = oldBuffer.buffer;
  audioLibrary[key] = track;
  const gainNode = gainNodes[key];
  track.connect(gainNode);
  if (loop) {
    track.loop = true;
  }
  track.start();
  audioContext.resume();
}

function stopAudio(key: AudioKey) {
  const track = audioLibrary[key]!;
  track.stop(0);
}

async function loadAudioBuffers() {
  const mainThemeAudio = {
    key: 'mainTheme' as AudioKey,
    url: '/public/Pixel-Peeker-Polka-faster-Kevin_MacLeod(chosic.com).mp3',
  };
  const flapAudio = {
    key: 'flap' as AudioKey,
    url: '/public/mixkit-quick-jump-arcade-game-239.wav',
  };
  const pipePassedAudio = {
    key: 'pipePassed' as AudioKey,
    url: '/public/mixkit-unlock-game-notification-253.wav',
  };
  const deathAudio = {
    key: 'death' as AudioKey,
    url: '/public/mixkit-losing-drums-2023.wav',
  };
  const audioUrls = [mainThemeAudio, flapAudio, pipePassedAudio, deathAudio];
  for (const { key, url } of audioUrls) {
    const track = audioContext.createBufferSource();
    track.buffer = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
    audioLibrary[key] = track;
  }
}

/******************************************************************************/

/* World (constants and state) */

type Pipe = {
  t: number;
  ceiling: boolean;
  height: number;
};

class World {
  #BG_SCALE = canvas.height / backgroundImage.height;
  #BIRD_HEIGHT = canvas.height / 10;
  #BIRD_SCALE = this.#BIRD_HEIGHT / bird1.height;
  #BIRD_WIDTH = bird1.width * this.#BIRD_SCALE;
  #BIRD_BIG_HIT_BOX_RADIUS = this.#BIRD_HEIGHT * 0.4;
  #BIRD_SMALL_HIT_BOX_RADIUS = this.#BIRD_HEIGHT * 0.3;
  #BIRD_SMALL_HIT_BOX_1_OFFSET = this.#BIRD_HEIGHT * 0.25;
  #BIRD_SMALL_HIT_BOX_2_OFFSET = this.#BIRD_HEIGHT * 0.2;
  #BIRD_X = this.#BIRD_HEIGHT * 1.5;
  #PIPE_SCALE = 4;
  #PIPE_HEIGHT = pipeImag.height * this.#PIPE_SCALE;
  #PIPE_WIDTH = pipeImag.width * this.#PIPE_SCALE;
  #FONT_SIZE = canvas.height * 0.05;

  dx = 0;
  birdY = canvas.height / 2 - this.#BIRD_HEIGHT / 2;
  birdSpeedY = 0;
  lastFlapAgo = Infinity;
  lastPipeCreated = 0;
  nextPipeIn = 0;
  keysDown: Record<string, boolean> = {};
  spaceNeedsHandling = false;
  isLooping = false;
  lastTimestamp = 0;
  gameStarted = this.lastTimestamp;
  pipes: Pipe[] = [];
  passedPipePositions = new Set<number>();
  flapsUsed = 0;
  isLoading = true;

  constructor() {
    this.#init();
    addEventListener('resize', () => {
      this.#init();
    });

    addEventListener('keydown', (event) => {
      this.keysDown[event.code] = true;
      if (event.code === 'Space') {
        this.spaceNeedsHandling = true;
        if (!this.isLooping && !this.isLoading) {
          canvas.classList.remove('game-over');
          startText.classList.add('hidden');
          this.reset();
          requestAnimationFrame(step);
        }
      }
    });

    addEventListener('keyup', (event) => {
      this.keysDown[event.code] = false;
    });
  }

  #init() {
    this.#BG_SCALE = canvas.height / backgroundImage.height;
    this.#BIRD_HEIGHT = canvas.height / 10;
    this.#BIRD_SCALE = this.#BIRD_HEIGHT / bird1.height;
    this.#BIRD_WIDTH = bird1.width * this.#BIRD_SCALE;
    this.#BIRD_BIG_HIT_BOX_RADIUS = this.#BIRD_HEIGHT * 0.4;
    this.#BIRD_SMALL_HIT_BOX_RADIUS = this.#BIRD_HEIGHT * 0.3;
    this.#BIRD_SMALL_HIT_BOX_1_OFFSET = this.#BIRD_HEIGHT * 0.25;
    this.#BIRD_SMALL_HIT_BOX_2_OFFSET = this.#BIRD_HEIGHT * 0.2;
    this.#BIRD_X = this.#BIRD_HEIGHT * 1.5;
    this.#PIPE_SCALE = 4;
    this.#PIPE_HEIGHT = pipeImag.height * this.#PIPE_SCALE;
    this.#PIPE_WIDTH = pipeImag.width * this.#PIPE_SCALE;
    this.#FONT_SIZE = canvas.height * 0.05;
  }

  reset() {
    this.dx = 0;
    this.birdY = canvas.height / 2 - this.birdHeight / 2;
    this.birdSpeedY = 0;
    this.lastFlapAgo = Infinity;
    this.spaceNeedsHandling = false;
    this.isLooping = true;
    this.lastTimestamp = performance.now();
    this.gameStarted = this.lastTimestamp;
    this.lastPipeCreated = this.lastTimestamp;
    this.nextPipeIn = 0;
    this.pipes = [];
    this.passedPipePositions.clear();
    this.flapsUsed = 0;
    console.log('Resetting');
    playAudio('mainTheme', true);
  }

  get bgScale(): number {
    return this.#BG_SCALE;
  }
  get birdHeight(): number {
    return this.#BIRD_HEIGHT;
  }
  get birdScale(): number {
    return this.#BIRD_SCALE;
  }
  get birdWidth(): number {
    return this.#BIRD_WIDTH;
  }
  get birdBigHitBoxRadius(): number {
    return this.#BIRD_BIG_HIT_BOX_RADIUS;
  }
  get birdSmallHitBoxRadius(): number {
    return this.#BIRD_SMALL_HIT_BOX_RADIUS;
  }
  get birdSmallHitBox1Offset(): number {
    return this.#BIRD_SMALL_HIT_BOX_1_OFFSET;
  }
  get birdSmallHitBox2Offset(): number {
    return this.#BIRD_SMALL_HIT_BOX_2_OFFSET;
  }
  get birdX(): number {
    return this.#BIRD_X;
  }
  get pipeScale(): number {
    return this.#PIPE_SCALE;
  }
  get pipeHeight(): number {
    return this.#PIPE_HEIGHT;
  }
  get pipeWidth(): number {
    return this.#PIPE_WIDTH;
  }

  get fontSize(): number {
    return this.#FONT_SIZE;
  }

  get birdAngle(): number {
    const birdAngleDeg =
      (Math.max(-600, Math.min(600, -world.birdSpeedY)) / 600) * 50;
    return birdAngleDeg * (Math.PI / 180);
  }
}
const world = new World();

/******************************************************************************/

/* Positions */

function getPipeCoordinatesInCanvasSpace(pipe: Pipe) {
  const x = canvas.width - (world.lastTimestamp - pipe.t);
  const y = pipe.ceiling
    ? pipe.height * world.bgScale - world.pipeHeight
    : (canvas.height - pipe.height) * world.bgScale;
  return {
    x,
    y,
  };
}

function getBirdCoordinatesInCanvasSpace() {
  return {
    x: world.birdX,
    y: world.birdY,
  };
}

function getHitBoxCoordinatesInCanvasSpace(
  rotateRad: number = 0,
  xOffset: number = 0
) {
  const origin = {
    x: xOffset,
    y: 0,
  };
  let xNew = origin.x * Math.cos(rotateRad);
  let yNew = origin.x * Math.sin(rotateRad);
  origin.x = xNew + world.birdX;
  origin.y = yNew + world.birdY;

  return origin;
}

function detectCollision(
  rect: { x: number; y: number; w: number; h: number },
  circle: { x: number; y: number; r: number }
) {
  let testX = circle.x;
  let testY = circle.y;

  // Bird is to the left of the pipe
  if (circle.x < rect.x) {
    testX = rect.x;
  }

  // Bird is to the right of the pipe
  else if (circle.x > rect.x + rect.w) {
    testX = rect.x + rect.w;
  }

  // Bird is above the pipe
  if (circle.y < rect.y) {
    testY = rect.y;
  }

  // Bird is below the pipe
  else if (circle.y > rect.y + rect.h) {
    testY = rect.y + rect.h;
  }

  const distX = circle.x - testX;
  const distY = circle.y - testY;
  const distance = Math.sqrt(distX ** 2 + distY ** 2);

  return distance <= circle.r;
}

/******************************************************************************/

/* Draw */

function drawText(
  text: string,
  x: number,
  y: number,
  fontSize: number = world.fontSize
) {
  context.font = `${fontSize}px monospace`;
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.fillText(text, x, y);
  context.strokeText(text, x, y);
}

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

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    backgroundImage,
    world.dx,
    0,
    backgroundImage.width,
    backgroundImage.height,
    0,
    0,
    backgroundImage.width * world.bgScale,
    backgroundImage.height * world.bgScale
  );
  context.drawImage(
    backgroundImage,
    world.dx - backgroundImage.width + 2,
    0,
    backgroundImage.width,
    backgroundImage.height,
    0,
    0,
    backgroundImage.width * world.bgScale,
    backgroundImage.height * world.bgScale
  );

  // Draw bird shadow
  const shadowScale = world.birdY / (canvas.height - 98);
  context.beginPath();
  context.ellipse(
    world.birdX,
    canvas.height - 70,
    54 * (1.5 - shadowScale),
    20 * (1.5 - shadowScale),
    0,
    0,
    Math.PI * 2
  );
  context.fillStyle = `rgba(0, 0, 0, ${shadowScale * 0.5})`;
  context.fill();

  // Draw pipes
  for (const pipe of world.pipes) {
    const { x: pipeX, y: pipeY } = getPipeCoordinatesInCanvasSpace(pipe);

    drawImage(
      pipeImag,
      pipeX + world.pipeWidth / 2,
      pipeY + world.pipeHeight / 2,
      world.pipeScale,
      pipe.ceiling ? Math.PI : 0
    );

    // Draw pipe hitbox
    // context.beginPath();
    // context.rect(pipeX, pipeY, world.pipeWidth, world.pipeHeight);
    // context.fillStyle = `rgba(0, 0, 255, ${shadowScale * 0.9})`;
    // context.fill();
  }

  // Draw bird

  const birdAngle = world.birdAngle;
  const bird = (() => {
    if (world.lastFlapAgo < 30) {
      return bird2;
    } else if (world.lastFlapAgo < 60) {
      return bird3;
    } else if (world.lastFlapAgo < 90) {
      return bird4;
    } else {
      return bird1;
    }
  })();
  drawImage(
    bird,
    world.birdX * 0.98,
    world.birdY * 0.98,
    world.birdScale,
    birdAngle
  );

  // Draw bird hitboxes
  // context.beginPath();
  // context.ellipse(
  //   world.birdX,
  //   world.birdY,
  //   world.birdBigHitBoxRadius,
  //   world.birdBigHitBoxRadius,
  //   birdAngle,
  //   0,
  //   Math.PI * 2
  // );
  // context.fillStyle = `rgba(255, 0, 0, ${shadowScale * 0.9})`;
  // context.fill();
  // const smallHitBox1Origin = getHitBoxCoordinatesInCanvasSpace(
  //   birdAngle,
  //   0.15 * world.birdX
  // );
  // context.beginPath();
  // context.ellipse(
  //   smallHitBox1Origin.x,
  //   smallHitBox1Origin.y,
  //   world.birdSmallHitBoxRadius,
  //   world.birdSmallHitBoxRadius,
  //   birdAngle,
  //   0,
  //   Math.PI * 2
  // );
  // context.fillStyle = `rgba(255, 0, 0, ${shadowScale * 0.9})`;
  // context.fill();
  // const smallHitBox2Origin = getHitBoxCoordinatesInCanvasSpace(
  //   birdAngle,
  //   -0.15 * world.birdX
  // );
  // context.beginPath();
  // context.ellipse(
  //   smallHitBox2Origin.x,
  //   smallHitBox2Origin.y,
  //   world.birdSmallHitBoxRadius,
  //   world.birdSmallHitBoxRadius,
  //   birdAngle,
  //   0,
  //   Math.PI * 2
  // );
  // context.fillStyle = `rgba(255, 0, 0, ${shadowScale * 0.9})`;
  // context.fill();

  // Draw ceiling and floor hitboxes
  // context.beginPath();
  // context.rect(0, 0, canvas.width, 10);
  // context.fillStyle = `rgba(0, 0, 255, ${shadowScale * 0.9})`;
  // context.fill();

  // context.beginPath();
  // context.rect(0, canvas.height - 30, canvas.width, 10);
  // context.fillStyle = `rgba(0, 0, 255, ${shadowScale * 0.9})`;
  // context.fill();

  // Draw stats
  context.lineWidth = 2;
  drawText(
    `Pipes avoided: ${world.passedPipePositions.size}`,
    canvas.width - world.fontSize * 11,
    world.fontSize
  );
  drawText(
    `Score: ${Math.floor((world.lastTimestamp - world.gameStarted) / 10)}`,
    canvas.width - world.fontSize * 11,
    world.fontSize * 2.5
  );
  drawText(
    `Flap counter: ${world.flapsUsed}`,
    canvas.width - world.fontSize * 11,
    world.fontSize * 4
  );

  // Draw game over
  if (!world.isLooping) {
    drawText(
      'Game Over',
      canvas.width / 2 - world.fontSize * 5.5,
      canvas.height / 2,
      world.fontSize * 2
    );
    drawText(
      'Press spacebar to restart',
      canvas.width / 2 - world.fontSize * 7.5,
      canvas.height / 2 + world.fontSize * 1.5
    );
  }
}

/******************************************************************************/

/* Game logic */

function die() {
  world.isLooping = false;
  canvas.classList.add('game-over');
  stopAudio('mainTheme');
  playAudio('death');
}

function step(timestamp: number) {
  const dt = timestamp - world.lastTimestamp;

  world.dx += dt / 2;
  world.dx %= backgroundImage.width;

  world.lastTimestamp = timestamp;
  world.lastFlapAgo += dt;

  // Thrust upwards
  if (world.keysDown['Space'] && world.spaceNeedsHandling) {
    world.birdSpeedY = Math.min(world.birdSpeedY + 600, 600);
    world.spaceNeedsHandling = false;
    world.lastFlapAgo = 0;
    world.flapsUsed++;
    playAudio('flap');
  }
  // Gravity
  world.birdY -= (world.birdSpeedY * dt) / 1_000;
  world.birdY = Math.max(46, world.birdY);

  // Delete pipes that are off-screen
  const newPipes: Pipe[] = [];
  for (const pipe of world.pipes) {
    const pipeX = world.pipeWidth + canvas.width - (timestamp - pipe.t);
    if (pipeX > -world.pipeWidth) {
      newPipes.push(pipe);
    }
    if (
      pipeX < world.birdX - world.pipeWidth / 2 &&
      !world.passedPipePositions.has(pipe.t)
    ) {
      // If pipe is passed, add it to
      playAudio('pipePassed');
      world.passedPipePositions.add(pipe.t);
    }
  }

  // Generate new pipes
  if (timestamp - world.lastPipeCreated > world.nextPipeIn) {
    const pipeHeight =
      Math.random() * canvas.height * 0.3 + canvas.height * 0.2;
    const ceiling = Math.random() > 0.5;
    world.pipes.push({
      t: timestamp,
      ceiling,
      height: pipeHeight,
    });
    const createTwoPipes = Math.random() > 0.5;
    if (createTwoPipes) {
      world.pipes.push({
        t: timestamp,
        ceiling: !ceiling,
        height: canvas.height * (1 - (Math.random() * 0.3 + 0.25)) - pipeHeight,
      });
    }
    world.lastPipeCreated = timestamp;
    world.nextPipeIn = 1_000 + Math.random() * 1_000;
  }

  const hitbox1 = getHitBoxCoordinatesInCanvasSpace();
  const hitbox2 = getHitBoxCoordinatesInCanvasSpace(
    world.birdAngle,
    0.15 * world.birdX
  );
  const hitbox3 = getHitBoxCoordinatesInCanvasSpace(
    world.birdAngle,
    -0.15 * world.birdX
  );

  // Detect if hit the ceiling
  if (
    detectCollision(
      { x: 0, w: canvas.width, y: 0, h: 10 },
      { ...hitbox1, r: world.birdBigHitBoxRadius }
    ) ||
    detectCollision(
      { x: 0, w: canvas.width, y: 0, h: 10 },
      { ...hitbox2, r: world.birdSmallHitBoxRadius }
    ) ||
    detectCollision(
      { x: 0, w: canvas.width, y: 0, h: 10 },
      { ...hitbox3, r: world.birdSmallHitBoxRadius }
    )
  ) {
    die();
  }

  // Detect if hit the floor
  if (
    detectCollision(
      { x: 0, w: canvas.width, y: canvas.height - 30, h: 10 },
      { ...hitbox1, r: world.birdBigHitBoxRadius }
    ) ||
    detectCollision(
      { x: 0, w: canvas.width, y: canvas.height - 30, h: 10 },
      { ...hitbox2, r: world.birdSmallHitBoxRadius }
    ) ||
    detectCollision(
      { x: 0, w: canvas.width, y: canvas.height - 30, h: 10 },
      { ...hitbox3, r: world.birdSmallHitBoxRadius }
    )
  ) {
    die();
  }

  // Detect if hit a pipe
  for (const pipeObj of world.pipes) {
    const pipe = getPipeCoordinatesInCanvasSpace(pipeObj);

    if (
      detectCollision(
        { ...pipe, w: world.pipeWidth, h: world.pipeHeight },
        { ...hitbox1, r: world.birdBigHitBoxRadius }
      ) ||
      detectCollision(
        { ...pipe, w: world.pipeWidth, h: world.pipeHeight },
        { ...hitbox2, r: world.birdSmallHitBoxRadius }
      ) ||
      detectCollision(
        { ...pipe, w: world.pipeWidth, h: world.pipeHeight },
        { ...hitbox3, r: world.birdSmallHitBoxRadius }
      )
    ) {
      die();
    }
  }
  // Accelerate downwards
  world.birdSpeedY -= (80 * (9.81 * dt)) / 1_000;
  draw();
  if (world.isLooping) {
    requestAnimationFrame(step);
  }
}

loadAudioBuffers().then(() => {
  world.isLoading = false;
  loadingText.classList.add('hidden');
  startText.classList.remove('hidden');
});

/******************************************************************************/
