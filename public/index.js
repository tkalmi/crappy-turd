var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'public/background.png'; // From https://www.freepik.com/free-vector/game-ground-texture-summer-landscape_31095380.htm#query=game%20background&position=14&from_view=keyword&track=ais&uuid=4c6c4914-7093-4c49-a0fb-e0e7e4db2c8d
var bgScale = canvas.height / backgroundImage.height;
var dx = 0;
function draw(dt) {
    dx += dt / 2;
    dx %= backgroundImage.width;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, dx, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * bgScale, backgroundImage.height * bgScale);
    context.drawImage(backgroundImage, dx - backgroundImage.width + 2, 0, backgroundImage.width, backgroundImage.height, 0, 0, backgroundImage.width * bgScale, backgroundImage.height * bgScale);
}
var lastTimestamp = 0;
function step(timestamp) {
    var dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    draw(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
