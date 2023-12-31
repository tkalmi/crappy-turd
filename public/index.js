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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
/* Canvas and image assets */
var _World_instances, _World_BG_SCALE, _World_BIRD_HEIGHT, _World_BIRD_SCALE, _World_BIRD_WIDTH, _World_BIRD_BIG_HIT_BOX_RADIUS, _World_BIRD_SMALL_HIT_BOX_RADIUS, _World_BIRD_SMALL_HIT_BOX_1_OFFSET, _World_BIRD_SMALL_HIT_BOX_2_OFFSET, _World_BIRD_X, _World_PIPE_SCALE, _World_PIPE_HEIGHT, _World_PIPE_WIDTH, _World_FONT_SIZE, _World_init;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var startText = document.getElementById('start-game');
var BASE_URL = window.location.href.replace(/\/$/, '');
var loadingText = document.getElementById('loading');
var imageLibrary = {};
function loadImages() {
    return __awaiter(this, void 0, void 0, function () {
        var images, _i, images_1, _a, key, url, image, objectUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    images = [
                        { key: 'bird1', url: "".concat(BASE_URL, "/public/bird_1.png") },
                        { key: 'bird2', url: "".concat(BASE_URL, "/public/bird_2.png") },
                        { key: 'bird3', url: "".concat(BASE_URL, "/public/bird_3.png") },
                        { key: 'bird4', url: "".concat(BASE_URL, "/public/bird_4.png") },
                        { key: 'pipe', url: "".concat(BASE_URL, "/public/pipe.png") },
                        { key: 'background', url: "".concat(BASE_URL, "/public/background.png") },
                    ];
                    _i = 0, images_1 = images;
                    _b.label = 1;
                case 1:
                    if (!(_i < images_1.length)) return [3 /*break*/, 4];
                    _a = images_1[_i], key = _a.key, url = _a.url;
                    image = new Image();
                    return [4 /*yield*/, fetch(url)
                            .then(function (res) { return res.blob(); })
                            .then(function (blob) { return URL.createObjectURL(blob); })];
                case 2:
                    objectUrl = _b.sent();
                    image.src = objectUrl;
                    imageLibrary[key] = image;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/******************************************************************************/
/* Audio */
var audioContext = new AudioContext();
var audioLibrary = {};
var gainNodes = {
    mainTheme: audioContext.createGain(),
    flap: audioContext.createGain(),
    pipePassed: audioContext.createGain(),
    death: audioContext.createGain(),
};
gainNodes.mainTheme.gain.value = 0.6;
gainNodes.flap.gain.value = 1;
gainNodes.pipePassed.gain.value = 0.3;
gainNodes.death.gain.value = 0.8;
for (var _i = 0, _a = Object.keys(gainNodes); _i < _a.length; _i++) {
    var key = _a[_i];
    gainNodes[key].connect(audioContext.destination);
}
function playAudio(key, loop) {
    if (loop === void 0) { loop = false; }
    var oldBuffer = audioLibrary[key];
    var track = audioContext.createBufferSource();
    track.buffer = oldBuffer.buffer;
    audioLibrary[key] = track;
    var gainNode = gainNodes[key];
    track.connect(gainNode);
    if (loop) {
        track.loop = true;
    }
    track.start();
    audioContext.resume();
}
function stopAudio(key) {
    var track = audioLibrary[key];
    track.stop(0);
}
function loadAudioBuffers() {
    return __awaiter(this, void 0, void 0, function () {
        var mainThemeAudio, flapAudio, pipePassedAudio, deathAudio, audioUrls, _i, audioUrls_1, _a, key, url, track, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mainThemeAudio = {
                        key: 'mainTheme',
                        url: "".concat(BASE_URL, "/public/Pixel-Peeker-Polka-faster-Kevin_MacLeod(chosic.com).mp3"),
                    };
                    flapAudio = {
                        key: 'flap',
                        url: "".concat(BASE_URL, "/public/mixkit-quick-jump-arcade-game-239.wav"),
                    };
                    pipePassedAudio = {
                        key: 'pipePassed',
                        url: "".concat(BASE_URL, "/public/mixkit-unlock-game-notification-253.wav"),
                    };
                    deathAudio = {
                        key: 'death',
                        url: "".concat(BASE_URL, "/public/mixkit-losing-drums-2023.wav"),
                    };
                    audioUrls = [mainThemeAudio, flapAudio, pipePassedAudio, deathAudio];
                    _i = 0, audioUrls_1 = audioUrls;
                    _c.label = 1;
                case 1:
                    if (!(_i < audioUrls_1.length)) return [3 /*break*/, 4];
                    _a = audioUrls_1[_i], key = _a.key, url = _a.url;
                    track = audioContext.createBufferSource();
                    _b = track;
                    return [4 /*yield*/, fetch(url)
                            .then(function (res) {
                            return res.arrayBuffer();
                        })
                            .then(function (arrayBuffer) { return audioContext.decodeAudioData(arrayBuffer); })];
                case 2:
                    _b.buffer = _c.sent();
                    audioLibrary[key] = track;
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var World = /** @class */ (function () {
    function World() {
        var _this = this;
        _World_instances.add(this);
        _World_BG_SCALE.set(this, canvas.height / imageLibrary.background.height);
        _World_BIRD_HEIGHT.set(this, canvas.height / 10);
        _World_BIRD_SCALE.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / imageLibrary.bird1.height);
        _World_BIRD_WIDTH.set(this, imageLibrary.bird1.width * __classPrivateFieldGet(this, _World_BIRD_SCALE, "f"));
        _World_BIRD_BIG_HIT_BOX_RADIUS.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.4);
        _World_BIRD_SMALL_HIT_BOX_RADIUS.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.3);
        _World_BIRD_SMALL_HIT_BOX_1_OFFSET.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.25);
        _World_BIRD_SMALL_HIT_BOX_2_OFFSET.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.2);
        _World_BIRD_X.set(this, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 1.5);
        _World_PIPE_SCALE.set(this, 4);
        _World_PIPE_HEIGHT.set(this, imageLibrary.pipe.height * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"));
        _World_PIPE_WIDTH.set(this, imageLibrary.pipe.width * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"));
        _World_FONT_SIZE.set(this, canvas.height * 0.05);
        this.dx = 0;
        this.birdY = canvas.height / 2 - __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / 2;
        this.birdSpeedY = 0;
        this.lastFlapAgo = Infinity;
        this.lastPipeCreated = 0;
        this.nextPipeIn = 0;
        this.keysDown = {};
        this.spaceNeedsHandling = false;
        this.isLooping = false;
        this.lastTimestamp = 0;
        this.gameStarted = this.lastTimestamp;
        this.pipes = [];
        this.passedPipePositions = new Set();
        this.flapsUsed = 0;
        this.isLoading = true;
        __classPrivateFieldGet(this, _World_instances, "m", _World_init).call(this);
        addEventListener('resize', function () {
            __classPrivateFieldGet(_this, _World_instances, "m", _World_init).call(_this);
        });
        addEventListener('keydown', function (event) {
            _this.keysDown[event.code] = true;
            if (event.code === 'Space') {
                _this.spaceNeedsHandling = true;
                if (!_this.isLooping && !_this.isLoading) {
                    canvas.classList.remove('game-over');
                    startText.classList.add('hidden');
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
        console.log('Resetting');
        playAudio('mainTheme', true);
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
    __classPrivateFieldSet(this, _World_BG_SCALE, canvas.height / imageLibrary.background.height, "f");
    __classPrivateFieldSet(this, _World_BIRD_HEIGHT, canvas.height / 10, "f");
    __classPrivateFieldSet(this, _World_BIRD_SCALE, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") / imageLibrary.bird1.height, "f");
    __classPrivateFieldSet(this, _World_BIRD_WIDTH, imageLibrary.bird1.width * __classPrivateFieldGet(this, _World_BIRD_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_BIRD_BIG_HIT_BOX_RADIUS, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.4, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_RADIUS, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.3, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_1_OFFSET, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.25, "f");
    __classPrivateFieldSet(this, _World_BIRD_SMALL_HIT_BOX_2_OFFSET, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 0.2, "f");
    __classPrivateFieldSet(this, _World_BIRD_X, __classPrivateFieldGet(this, _World_BIRD_HEIGHT, "f") * 1.5, "f");
    __classPrivateFieldSet(this, _World_PIPE_SCALE, 4, "f");
    __classPrivateFieldSet(this, _World_PIPE_HEIGHT, imageLibrary.pipe.height * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_PIPE_WIDTH, imageLibrary.pipe.width * __classPrivateFieldGet(this, _World_PIPE_SCALE, "f"), "f");
    __classPrivateFieldSet(this, _World_FONT_SIZE, canvas.height * 0.05, "f");
};
var world;
/******************************************************************************/
/* Positions */
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
/******************************************************************************/
/* Draw */
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
    context.drawImage(imageLibrary.background, world.dx, 0, imageLibrary.background.width, imageLibrary.background.height, 0, 0, imageLibrary.background.width * world.bgScale, imageLibrary.background.height * world.bgScale);
    context.drawImage(imageLibrary.background, world.dx - imageLibrary.background.width + 2, 0, imageLibrary.background.width, imageLibrary.background.height, 0, 0, imageLibrary.background.width * world.bgScale, imageLibrary.background.height * world.bgScale);
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
        drawImage(imageLibrary.pipe, pipeX + world.pipeWidth / 2, pipeY + world.pipeHeight / 2, world.pipeScale, pipe.ceiling ? Math.PI : 0);
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
            return imageLibrary.bird2;
        }
        else if (world.lastFlapAgo < 60) {
            return imageLibrary.bird3;
        }
        else if (world.lastFlapAgo < 90) {
            return imageLibrary.bird4;
        }
        else {
            return imageLibrary.bird1;
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
    drawText("Pipes avoided: ".concat(world.passedPipePositions.size), canvas.width - world.fontSize * 13, world.fontSize);
    drawText("Time survived: ".concat(((world.lastTimestamp - world.gameStarted) /
        1000).toFixed(2), "s"), canvas.width - world.fontSize * 13, world.fontSize * 2.5);
    drawText("Flap counter: ".concat(world.flapsUsed), canvas.width - world.fontSize * 13, world.fontSize * 4);
    drawText("Tap spacebar to flap", canvas.width / 2 - world.fontSize * 6, canvas.height - world.fontSize);
    // Draw game over
    if (!world.isLooping) {
        drawText('Game Over', canvas.width / 2 - world.fontSize * 5.5, canvas.height / 2, world.fontSize * 2);
        drawText('Press spacebar to restart', canvas.width / 2 - world.fontSize * 7.5, canvas.height / 2 + world.fontSize * 1.5);
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
function step(timestamp) {
    var dt = timestamp - world.lastTimestamp;
    world.dx += dt / 2;
    world.dx %= imageLibrary.background.width;
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
        if (pipeX < world.birdX - world.pipeWidth / 2 &&
            !world.passedPipePositions.has(pipe.t)) {
            // If pipe is passed, add it to
            playAudio('pipePassed');
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
        die();
    }
    // Detect if hit the floor
    if (detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox1), { r: world.birdBigHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox2), { r: world.birdSmallHitBoxRadius })) ||
        detectCollision({ x: 0, w: canvas.width, y: canvas.height - 30, h: 10 }, __assign(__assign({}, hitbox3), { r: world.birdSmallHitBoxRadius }))) {
        die();
    }
    // Detect if hit a pipe
    for (var _b = 0, _c = world.pipes; _b < _c.length; _b++) {
        var pipeObj = _c[_b];
        var pipe = getPipeCoordinatesInCanvasSpace(pipeObj);
        if (detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox1), { r: world.birdBigHitBoxRadius })) ||
            detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox2), { r: world.birdSmallHitBoxRadius })) ||
            detectCollision(__assign(__assign({}, pipe), { w: world.pipeWidth, h: world.pipeHeight }), __assign(__assign({}, hitbox3), { r: world.birdSmallHitBoxRadius }))) {
            die();
        }
    }
    // Accelerate downwards
    world.birdSpeedY -= (80 * (9.81 * dt)) / 1000;
    draw();
    if (world.isLooping) {
        requestAnimationFrame(step);
    }
}
var assetLoadPromises = [loadAudioBuffers(), loadImages()];
Promise.all(assetLoadPromises).then(function () {
    world = new World();
    world.isLoading = false;
    loadingText.classList.add('hidden');
    startText.classList.remove('hidden');
});
/******************************************************************************/
