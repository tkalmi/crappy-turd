var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _World_instances, _World_BG_SCALE, _World_BIRD_HEIGHT, _World_BIRD_SCALE, _World_BIRD_WIDTH, _World_BIRD_BIG_HIT_BOX_RADIUS, _World_BIRD_SMALL_HIT_BOX_RADIUS, _World_BIRD_SMALL_HIT_BOX_1_OFFSET, _World_BIRD_SMALL_HIT_BOX_2_OFFSET, _World_BIRD_X, _World_PIPE_SCALE, _World_PIPE_HEIGHT, _World_PIPE_WIDTH, _World_FONT_SIZE, _World_init;
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
var World = /** @class */ (function () {
    function World() {
        var _this = this;
        _World_instances.add(this);
        _World_BG_SCALE.set(this, canvas.height / backgroundImage.height);
        _World_BIRD_HEIGHT.set(this, canvas.height / 10);
        _World_BIRD_SCALE.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / bird1.height);
        _World_BIRD_WIDTH.set(this, bird1.width * __classPrivateFieldGet(this, _World_BIRD_SCALE, "f"));
        _World_BIRD_BIG_HIT_BOX_RADIUS.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.4);
        _World_BIRD_SMALL_HIT_BOX_RADIUS.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.3);
        _World_BIRD_SMALL_HIT_BOX_1_OFFSET.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.25);
        _World_BIRD_SMALL_HIT_BOX_2_OFFSET.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.2);
        _World_BIRD_X.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 1.5);
        _World_PIPE_SCALE.set(this, 4);
        _World_PIPE_HEIGHT.set(this, pipeImag.height * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"));
        _World_PIPE_WIDTH.set(this, pipeImag.width * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"));
        _World_FONT_SIZE.set(this, canvas.height * 0.05);
        this.dx = 0;
        this.birdY = canvas.height / 2 - __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / 2;
        this.birdSpeedY = 0;
        this.lastFlapAgo = Infinity;
        this.lastPipeCreated = 0;
        this.nextPipeIn = 0;
        this.keysDown = {};
        this.spaceNeedsHandling = false;
        this.isLooping = true;
        this.lastTimestamp = 0;
        this.gameStarted = this.lastTimestamp;
        this.pipes = [];
        this.passedPipePositions = new Set();
        this.flapsUsed = 0;
        __classPrivateFieldGet(this, _World_instances, "m", _World_init).call(this);
        addEventListener('resize', function () {
            __classPrivateFieldGet(_this, _World_instances, "m", _World_init).call(_this);
        });
        addEventListener('keydown', function (event) {
            _this.keysDown[event.code] = true;
            if (event.code === 'Space') {
                _this.spaceNeedsHandling = true;
                if (!_this.isLooping) {
                    canvas.classList.remove('game-over');
                    _this.reset();
                    requestAnimationFrame(step);
                }
            }
        });
        addEventListener('keyup', function (event) {
            _this.keysDown[event.code] = false;
        });
    }
    World.prototype.reset = function () {
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
    };
    Object.defineProperty(World.prototype, "bgScale", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BG_SCALE, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdHeight", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdScale", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_SCALE, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdWidth", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_WIDTH, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdBigHitBoxRadius", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_BIG_HIT_BOX_RADIUS, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdSmallHitBoxRadius", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_SMALL_HIT_BOX_RADIUS, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdSmallHitBox1Offset", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_SMALL_HIT_BOX_1_OFFSET, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdSmallHitBox2Offset", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_SMALL_HIT_BOX_2_OFFSET, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdX", {
        get: function () {
            return __classPrivateFieldGet(this, _World_BIRD_X, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "pipeScale", {
        get: function () {
            return __classPrivateFieldGet(this, _World_PIPE_SCALE, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "pipeHeight", {
        get: function () {
            return __classPrivateFieldGet(this, _World_PIPE_HEIGHT, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "pipeWidth", {
        get: function () {
            return __classPrivateFieldGet(this, _World_PIPE_WIDTH, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "fontSize", {
        get: function () {
            return __classPrivateFieldGet(this, _World_FONT_SIZE, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(World.prototype, "birdAngle", {
        get: function () {
            var birdAngleDeg = (Math.max(-600, Math.min(600, -world.birdSpeedY)) / 600) * 50;
            return birdAngleDeg * (Math.PI / 180);
        },
        enumerable: false,
        configurable: true
    });
    return World;
}());
_World_BG_SCALE = new WeakMap(), _World_BIRD_HEIGHT = new WeakMap(), _World_BIRD_SCALE = new WeakMap(), _World_BIRD_WIDTH = new WeakMap(), _World_BIRD_BIG_HIT_BOX_RADIUS = new WeakMap(), _World_BIRD_SMALL_HIT_BOX_RADIUS = new WeakMap(), _World_BIRD_SMALL_HIT_BOX_1_OFFSET = new WeakMap(), _World_BIRD_SMALL_HIT_BOX_2_OFFSET = new WeakMap(), _World_BIRD_X = new WeakMap(), _World_PIPE_SCALE = new WeakMap(), _World_PIPE_HEIGHT = new WeakMap(), _World_PIPE_WIDTH = new WeakMap(), _World_FONT_SIZE = new WeakMap(), _World_instances = new WeakSet(), _World_init = function _World_init() {
    __classPrivateFieldSet(this, _World_BG_SCALE, canvas.height / backgroundImage.height, "f");
    __classPrivateFieldSet(this, _World_BIRD_HEIGHT, canvas.height / 10, "f");
    __classPrivateFieldSet(this, _World_BIRD_SCALE, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / bird1.height, "f");
    __classPrivateFieldSet(this, _World_BIRD_WIDTH, bird1.width * __classPrivateFieldGet(this, _World_BIRD_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_BIRD_BIG_HIT_BOX_RADIUS, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.4, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_RADIUS, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.3, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_1_OFFSET, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.25, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_2_OFFSET, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.2, "f");
    __classPrivateFieldSet(this, _World_BIRD_X, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 1.5, "f");
    __classPrivateFieldSet(this, _World_PIPE_SCALE, 4, "f");
    __classPrivateFieldSet(this, _World_PIPE_HEIGHT, pipeImag.height * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_PIPE_WIDTH, pipeImag.width * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_FONT_SIZE, canvas.height * 0.05, "f");
};
var world = new World();
function getPipeCoordinatesInCanvasSpace(pipe) {
    var x = canvas.width - (world.lastTimestamp - pipe.t);
    var y = pipe.ceiling
        ? pipe.height * world.bgScale - world.pipeHeight
        : (canvas.height - pipe.height) * world.bgScale;
    return {
        x: x,
        y: y,
    };
}
function getBirdCoordinatesInCanvasSpace() {
    return {
        x: world.birdX,
        y: world.birdY,
    };
}
function drawText(text, x, y, fontSize) {
    if (fontSize === void 0) { fontSize = world.fontSize; }
    context.font = "".concat(fontSize, "px monospace");
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.fillText(text, x, y);
    context.strokeText(text, x, y);
}
function drawImage(image, x, y, scale, rotation) {
    context.setTransform(scale, 0, 0, scale, x, y);
    context.rotate(rotation);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.setTransform(1, 0, 0, 1, 0, 0);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, world.dx, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * world.bgScale, backgroundImage.height * world.bgScale);
    context.drawImage(backgroundImage, world.dx - backgroundImage.width + 2, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * world.bgScale, backgroundImage.height * world.bgScale);
    // Draw bird shadow
    var shadowScale = world.birdY / (canvas.height - 98);
    context.beginPath();
    context.ellipse(world.birdX, canvas.height - 70, 54 * (1.5 - shadowScale), 20 * (1.5 - shadowScale), 0, 0, Math.PI * 2);
    context.fillStyle = "rgba(0, 0, 0, ".concat(shadowScale * 0.5, ")");
    context.fill();
    // Draw pipes
    for (var _i = 0, _a = world.pipes; _i < _a.length; _i++) {
        var pipe = _a[_i];
        var _b = getPipeCoordinatesInCanvasSpace(pipe), pipeX = _b.x, pipeY = _b.y;
        drawImage(pipeImag, pipeX + world.pipeWidth / 2, pipeY + world.pipeHeight / 2, world.pipeScale, pipe.ceiling ? Math.PI : 0);
        // Draw pipe hitbox
        // context.beginPath();
        // context.rect(pipeX, pipeY, world.pipeWidth, world.pipeHeight);
        // context.fillStyle = `rgba(0, 0, 255, ${shadowScale * 0.9})`;
        // context.fill();
    }
    // Draw bird
    var birdAngle = world.birdAngle;
    var bird = (function () {
        if (world.lastFlapAgo < 30) {
            return bird2;
        }
        else if (world.lastFlapAgo < 60) {
            return bird3;
        }
        else if (world.lastFlapAgo < 90) {
            return bird4;
        }
        else {
            return bird1;
        }
    })();
    drawImage(bird, world.birdX * 0.98, world.birdY * 0.98, world.birdScale, birdAngle);
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
    drawText("Pipes avoided: ".concat(world.passedPipePositions.size), canvas.width - world.fontSize * 11, world.fontSize);
    drawText("Score: ".concat(Math.floor((world.lastTimestamp - world.gameStarted) / 10)), canvas.width - world.fontSize * 11, world.fontSize * 2.5);
    drawText("Flaps used: ".concat(world.flapsUsed), canvas.width - world.fontSize * 11, world.fontSize * 4);
    // Draw game over
    if (!world.isLooping) {
        drawText('Game Over', canvas.width / 2 - world.fontSize * 5.5, canvas.height / 2, world.fontSize * 2);
        drawText('Press spacebar to restart', canvas.width / 2 - world.fontSize * 7.5, canvas.height / 2 + world.fontSize * 1.5);
    }
}
function getHitBoxCoordinatesInCanvasSpace(rotateRad, xOffset) {
    if (rotateRad === void 0) { rotateRad = 0; }
    if (xOffset === void 0) { xOffset = 0; }
    var origin = {
        x: xOffset,
        y: 0,
    };
    var xNew = origin.x * Math.cos(rotateRad);
    var yNew = origin.x * Math.sin(rotateRad);
    origin.x = xNew + world.birdX;
    origin.y = yNew + world.birdY;
    return origin;
}
function detectCollision(rect, circle) {
    var testX = circle.x;
    var testY = circle.y;
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
    var distX = circle.x - testX;
    var distY = circle.y - testY;
    var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    return distance <= circle.r;
}
function step(timestamp) {
    var dt = timestamp - world.lastTimestamp;
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
    }
    // Gravity
    world.birdY -= (world.birdSpeedY * dt) / 1000;
    world.birdY = Math.max(46, world.birdY);
    // Delete pipes that are off-screen
    var newPipes = [];
    for (var _i = 0, _a = world.pipes; _i < _a.length; _i++) {
        var pipe = _a[_i];
        var pipeX = world.pipeWidth + canvas.width - (timestamp - pipe.t);
        if (pipeX > -world.pipeWidth) {
            newPipes.push(pipe);
        }
        if (pipeX < world.birdX - world.pipeWidth / 2) {
            // If pipe is passed, add it to
            world.passedPipePositions.add(pipe.t);
        }
    }
    // Generate new pipes
    if (timestamp - world.lastPipeCreated > world.nextPipeIn) {
        var pipeHeight = Math.random() * canvas.height * 0.3 + canvas.height * 0.2;
        var ceiling = Math.random() > 0.5;
        world.pipes.push({
            t: timestamp,
            ceiling: ceiling,
            height: pipeHeight,
        });
        var createTwoPipes = Math.random() > 0.5;
        if (createTwoPipes) {
            world.pipes.push({
                t: timestamp,
                ceiling: !ceiling,
                height: canvas.height * (1 - (Math.random() * 0.3 + 0.25)) - pipeHeight,
            });
        }
        world.lastPipeCreated = timestamp;
        world.nextPipeIn = 1000 + Math.random() * 1000;
    }
    var hitbox1 = getHitBoxCoordinatesInCanvasSpace();
    var hitbox2 = getHitBoxCoordinatesInCanvasSpace(world.birdAngle, 0.15 * world.birdX);
    var hitbox3 = getHitBoxCoordinatesInCanvasSpace(world.birdAngle, -0.15 * world.birdX);
    // Detect if hit the ceiling
    if (detectCollision({ x: 0, w: canvas.width, y: 0, h: 10 }, __assign(__assign({}, hitbox1), { r: world.birdBigHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: 0, h: 10 }, __assign(__assign({}, hitbox2), { r: world.birdSmallHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: 0, h: 10 }, __assign(__assign({}, hitbox3), { r: world.birdSmallHitBoxRadius }))) {
        world.isLooping = false;
        canvas.classList.add('game-over');
    }
    // Detect if hit the floor
    if (detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox1), { r: world.birdBigHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox2), { r: world.birdSmallHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox3), { r: world.birdSmallHitBoxRadius }))) {
        world.isLooping = false;
        canvas.classList.add('game-over');
    }
    // Detect if hit a pipe
    for (var _b = 0, _c = world.pipes; _b < _c.length; _b++) {
        var pipeObj = _c[_b];
        var pipe = getPipeCoordinatesInCanvasSpace(pipeObj);
        if (detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox1), { r: world.birdBigHitBoxRadius })) ||
            detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox2), { r: world.birdSmallHitBoxRadius })) ||
            detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox3), { r: world.birdSmallHitBoxRadius }))) {
            world.isLooping = false;
            canvas.classList.add('game-over');
        }
    }
    // Accelerate downwards
    world.birdSpeedY -= (80 * (9.81 * dt)) / 1000;
    draw();
    if (world.isLooping) {
        requestAnimationFrame(step);
    }
}
requestAnimationFrame(step);
