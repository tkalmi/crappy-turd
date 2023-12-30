var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'public/background.png';
var bird1 = new Image();
bird1.src = 'public/bird_1.png';
var bird2 = new Image();
bird2.src = 'public/bird_2.png';
var bird3 = new Image();
bird3.src = 'public/bird_3.png';
var bird4 = new Image();
bird4.src = 'public/bird_4.png';
var pipeImag = new Image();
pipeImag.src = 'public/pipe.png';
function getPipeCoordinatesInCanvasSpace(pipe) {
    var x = canvas.width - (lastTimestamp - pipe.t);
    var y = pipe.ceiling
        ? pipe.height * bgScale - PIPE_HEIGHT
        : (canvas.height - pipe.height) * bgScale;
    return {
        x: x,
        y: y,
    };
}
function getBirdCoordinatesInCanvasSpace() {
    return {
        x: BIRD_X,
        y: birdY,
    };
}
var BIRD_HEIGHT = canvas.height / 10;
var BIRD_SCALE = BIRD_HEIGHT / bird1.height;
var BIRD_WIDTH = bird1.width * BIRD_SCALE;
var BIRD_HIT_BOX_RADIUS = BIRD_HEIGHT * 0.6;
var BIRD_X = BIRD_HEIGHT * 1.5;
var PIPE_SCALE = 4;
var PIPE_HEIGHT = pipeImag.height * PIPE_SCALE;
var PIPE_WIDTH = pipeImag.width * PIPE_SCALE;
var bgScale = canvas.height / backgroundImage.height;
var dx = 0;
var birdY = canvas.height / 2 - BIRD_HEIGHT / 2;
var birdSpeedY = 0;
var lastFlapAgo = Infinity;
var lastPipeCreated = 0;
var nextPipeIn = 0;
function drawImage(image, x, y, scale, rotation) {
    context.setTransform(scale, 0, 0, scale, x, y);
    context.rotate(rotation);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.setTransform(1, 0, 0, 1, 0, 0);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, dx, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * bgScale, backgroundImage.height * bgScale);
    context.drawImage(backgroundImage, dx - backgroundImage.width + 2, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * bgScale, backgroundImage.height * bgScale);
    // Draw bird shadow
    var shadowScale = birdY / (canvas.height - 98);
    context.beginPath();
    context.ellipse(BIRD_X, canvas.height - 70, 54 * (1.5 - shadowScale), 20 * (1.5 - shadowScale), 0, 0, Math.PI * 2);
    context.fillStyle = "rgba(0, 0, 0, ".concat(shadowScale * 0.5, ")");
    context.fill();
    // Draw pipes
    for (var _i = 0, pipes_1 = pipes; _i < pipes_1.length; _i++) {
        var pipe = pipes_1[_i];
        var _a = getPipeCoordinatesInCanvasSpace(pipe), pipeX = _a.x, pipeY = _a.y;
        // Draw pipe hitbox
        // context.beginPath();
        // context.rect(pipeX, pipeY, PIPE_WIDTH, PIPE_HEIGHT);
        // context.fillStyle = `rgba(0, 0, 255, ${shadowScale * 0.9})`;
        // context.fill();
        drawImage(pipeImag, pipeX + PIPE_WIDTH / 2, pipeY + PIPE_HEIGHT / 2, PIPE_SCALE, pipe.ceiling ? Math.PI : 0);
    }
    // Draw bird hitbox
    // context.beginPath();
    // context.ellipse(
    //   BIRD_X,
    //   birdY,
    //   BIRD_HIT_BOX_RADIUS,
    //   BIRD_HIT_BOX_RADIUS,
    //   0,
    //   0,
    //   Math.PI * 2
    // );
    // context.fillStyle = `rgba(255, 0, 0, ${shadowScale * 0.9})`;
    // context.fill();
    // Draw bird
    var birdAngle = (Math.max(-600, Math.min(600, -birdSpeedY)) / 600) * 50;
    var bird = (function () {
        if (lastFlapAgo < 30) {
            return bird2;
        }
        else if (lastFlapAgo < 60) {
            return bird3;
        }
        else if (lastFlapAgo < 90) {
            return bird4;
        }
        else {
            return bird1;
        }
    })();
    drawImage(bird, BIRD_X, birdY, BIRD_SCALE, birdAngle * (Math.PI / 180));
}
var keysDown = {};
var spaceNeedsHandling = false;
var looping = true;
var lastTimestamp = 0;
var pipes = [];
function step(timestamp) {
    var dt = timestamp - lastTimestamp;
    dx += dt / 2;
    dx %= backgroundImage.width;
    lastTimestamp = timestamp;
    lastFlapAgo += dt;
    // Thrust upwards
    if (keysDown['Space'] && spaceNeedsHandling) {
        birdSpeedY = Math.min(birdSpeedY + 600, 600);
        spaceNeedsHandling = false;
        lastFlapAgo = 0;
    }
    // Gravity
    birdY -= (birdSpeedY * dt) / 1000;
    birdY = Math.max(46, birdY);
    // Hit the floor or ceiling
    if (canvas.height - birdY <= BIRD_HIT_BOX_RADIUS ||
        birdY <= BIRD_HIT_BOX_RADIUS) {
        looping = false;
        canvas.classList.add('game-over');
    }
    // Delete pipes that are off-screen
    pipes = pipes.filter(function (pipe) { return PIPE_WIDTH + canvas.width - (timestamp - pipe.t) > -PIPE_WIDTH; });
    // Generate new pipes
    if (timestamp - lastPipeCreated > nextPipeIn) {
        var pipeHeight = Math.random() * canvas.height * 0.3 + canvas.height * 0.2;
        var ceiling = Math.random() > 0.5;
        pipes.push({
            t: timestamp,
            ceiling: ceiling,
            height: pipeHeight,
        });
        var createTwoPipes = Math.random() > 0.5;
        if (createTwoPipes) {
            pipes.push({
                t: timestamp,
                ceiling: !ceiling,
                height: canvas.height * (1 - (Math.random() * 0.3 + 0.25)) - pipeHeight,
            });
        }
        lastPipeCreated = timestamp;
        nextPipeIn = 1000 + Math.random() * 1000;
    }
    // Hit pipe
    for (var _i = 0, pipes_2 = pipes; _i < pipes_2.length; _i++) {
        var pipeObj = pipes_2[_i];
        var bird = getBirdCoordinatesInCanvasSpace();
        var pipe = getPipeCoordinatesInCanvasSpace(pipeObj);
        var testX = bird.x;
        var testY = bird.y;
        // Bird is to the left of the pipe
        if (bird.x < pipe.x) {
            testX = pipe.x;
        }
        // Bird is to the right of the pipe
        else if (bird.x > pipe.x + PIPE_WIDTH) {
            testX = pipe.x + PIPE_WIDTH;
        }
        // Bird is above the pipe
        if (bird.y < pipe.y) {
            testY = pipe.y;
        }
        // Bird is below the pipe
        else if (bird.y > pipe.y + PIPE_HEIGHT) {
            testY = pipe.y + PIPE_HEIGHT;
        }
        var distX = bird.x - testX;
        var distY = bird.y - testY;
        var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        if (distance <= BIRD_HIT_BOX_RADIUS) {
            looping = false;
            canvas.classList.add('game-over');
        }
    }
    // Accelerate downwards
    birdSpeedY -= (80 * (9.81 * dt)) / 1000;
    draw();
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
addEventListener('keydown', function (event) {
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
addEventListener('keyup', function (event) {
    keysDown[event.code] = false;
});
