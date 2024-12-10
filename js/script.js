// script.js

// Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let sniperMode = false; // Tracks if sniper mode is active
let zoomLevel = 1; // Default zoom level
let originalSpeed = 1; // Original game speed
let gameSpeed = 1; // Current game speed

// Player Object (Example)
const player = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    color: "blue",
};

// Enemy Object (Example)
const enemy = {
    x: 200,
    y: 200,
    width: 30,
    height: 30,
    color: "red",
    health: 1,
};

// Function to toggle sniper mode
function toggleSniperMode() {
    sniperMode = !sniperMode;
    if (sniperMode) {
        console.log("Sniper Mode Activated!");
        zoomLevel = 2; // Zoom in
        gameSpeed = 0.5; // Slow motion
    } else {
        console.log("Sniper Mode Deactivated!");
        zoomLevel = 1; // Reset zoom
        gameSpeed = originalSpeed; // Reset speed
    }
}

// Listen for the 'S' key to toggle sniper mode
document.addEventListener('keydown', function(event) {
    if (event.key === 's' || event.key === 'S') {
        toggleSniperMode();
    }
});

// Function to check if the player hits the enemy
function checkHit() {
    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );
}

// Update Function (Game Logic)
function update() {
    // Apply game speed
    if (sniperMode) {
        // Slow motion effect
        requestAnimationFrame(update);
    } else {
        // Normal speed
        setTimeout(update, 1000 / 60);
    }

    // Example: Check for hits and apply one-shot kills in sniper mode
    if (sniperMode && checkHit()) {
        enemy.health = 0;
        console.log("Enemy killed in sniper mode!");
    }

    // Update game logic here (e.g., move enemies, handle collisions, etc.)
}

// Draw Function (Rendering)
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom effect
    ctx.save();
    ctx.scale(zoomLevel, zoomLevel);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Enemy
    if (enemy.health > 0) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Restore the canvas scale
    ctx.restore();

    // Draw sniper mode indicator
    if (sniperMode) {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("Sniper Mode Active", 10, 30);
    }
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the Game Loop
gameLoop();