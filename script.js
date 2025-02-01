// Setup canvas
var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");

// Load and setup background music
var bgMusic = new Audio("Taylor_Swift_-_Love_Story__Karaoke_Version_(128k).m4a");
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Create an overlay for the click-to-start interaction
var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.cursor = "pointer";
overlay.style.zIndex = "1000";

var overlayText = document.createElement("div");
overlayText.textContent = "Click anywhere to begin";
overlayText.style.color = "white";
overlayText.style.fontSize = "24px";
overlayText.style.fontFamily = "Arial, sans-serif";

overlay.appendChild(overlayText);
document.body.appendChild(overlay);

// Handle click to start
function startExperience() {
  bgMusic.play();
  overlay.style.display = "none";
  draw(); // Start the animation
}
overlay.addEventListener("click", startExperience);

// Load background image
var bgImage = new Image();
bgImage.src = "moon1.jpg"; // Ensure the image path is correct

// Animation variables
var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

// Helper function to draw multiline text
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

// Main text animation function
function drawText() {
  var fontSize = Math.min(30, window.innerWidth / 25); // Responsive font size
  var lineHeight = 8;
  context.font = fontSize + "px Comic Sans MS";
  context.textAlign = "center";

  // Animation for each text phase
  if (frameNumber < 300) {
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "every day I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  } else if (frameNumber < 600) {
    opacity -= 0.01;
  } else if (frameNumber < 1200) {
    if (frameNumber === 600) opacity = 0; // Reset opacity
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    drawTextWithLineBreaks(
      ["amongst trillions of stars,", "over billions of years"],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity += frameNumber < 900 ? 0.01 : -0.01;
  } else if (frameNumber < 1800) {
    if (frameNumber === 1200) opacity = 0; // Reset opacity
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "to be alive, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += frameNumber < 1500 ? 0.01 : -0.01;
  } else if (frameNumber < 2400) {
    if (frameNumber === 1800) opacity = 0; // Reset opacity
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(
      "is so incredibly, unfathomably unlikely",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += frameNumber < 2100 ? 0.01 : -0.01;
  } else if (frameNumber < 3000) {
    if (frameNumber === 2400) opacity = 0; // Reset opacity
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    drawTextWithLineBreaks(
      [
        "and yet here I am to get the impossible",
        "chance to get to know you",
      ],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity += frameNumber < 2700 ? 0.01 : -0.01;
  } else {
    // Final text animations
    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    drawTextWithLineBreaks(
      [
        "I love you so much, more than",
        "all the time and space in the universe can contain",
      ],
      canvas.width / 2,
      canvas.height / 2,
      fontSize,
      lineHeight
    );
    opacity += 0.01;
    context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
    drawTextWithLineBreaks(
      [
        "and I can't wait to spend all the time in",
        "the world to share that love with you!",
      ],
      canvas.width / 2,
      canvas.height / 2 + 70,
      fontSize,
      lineHeight
    );
    secondOpacity += 0.01;
    context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
    drawTextWithLineBreaks(
      [
        "Happy Birthday to my Bestfriend in Arms,",
        "Sister who cares, Mother who loves,",
        "and Partner in Crime! I Love You ❤️!!",
      ],
      canvas.width / 2,
      canvas.height / 2 + 120,
      fontSize,
      lineHeight
    );
    thirdOpacity += 0.01;
  }
}

// Draw background function
function drawBackground() {
  context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

// Main animation loop
function draw() {
  if (bgImage.complete) {
    drawBackground();
  } else {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  drawText();
  frameNumber++;

  // Handle video transition
  if (frameNumber >= 4000) {
    var button = document.getElementById("Button");
    var video = document.getElementById("finalVideo");
    if (button) button.style.display = "flex";
    canvas.style.display = "none";
    video.style.display = "block";
    video.play();
    return;
  }
  requestAnimationFrame(draw);
}

// Resize handler
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (bgImage.complete) {
    drawBackground();
  }
});
