// Gear Visualization Script

// Canvas and context
const canvas = document.getElementById('gear-canvas');
const ctx = canvas.getContext('2d');

// Gear parameters
let gear1Teeth = parseInt(document.getElementById('gear1-teeth').value);
let gear2Teeth = parseInt(document.getElementById('gear2-teeth').value);
let gear3Teeth = parseInt(document.getElementById('gear3-teeth').value);

// Animation parameters
let animationSpeed = parseInt(document.getElementById('animation-speed').value);
let animationId = null;
let angle = 0;

// Gear colors
const gear1Color = '#FFD700'; // Yellow
const gear2Color = '#4682B4'; // Steel Blue
const gear3Color = '#32CD32'; // Lime Green

// Gear positions
const gear1X = canvas.width / 2 - 120;
const gear1Y = canvas.height / 2;
const gear2X = canvas.width / 2 + 50;
const gear2Y = canvas.height / 2;
const gear3X = canvas.width / 2 + 170;
const gear3Y = canvas.height / 2;

// Initialize
updateGearInfo();
drawGears();

// Event listeners
document.getElementById('update-btn').addEventListener('click', function() {
    // Update gear parameters
    gear1Teeth = parseInt(document.getElementById('gear1-teeth').value);
    gear2Teeth = parseInt(document.getElementById('gear2-teeth').value);
    gear3Teeth = parseInt(document.getElementById('gear3-teeth').value);
    animationSpeed = parseInt(document.getElementById('animation-speed').value);
    
    // Reset animation
    angle = 0;
    
    // Update display
    updateGearInfo();
    
    // Restart animation if it was running
    if (animationId) {
        cancelAnimationFrame(animationId);
        animate();
    } else {
        drawGears();
    }
});

// Start/stop animation on canvas click
canvas.addEventListener('click', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    } else {
        animate();
    }
});

// Update gear information display
function updateGearInfo() {
    document.getElementById('gear1-info-teeth').textContent = gear1Teeth;
    document.getElementById('gear2-info-teeth').textContent = gear2Teeth;
    document.getElementById('gear3-info-teeth').textContent = gear3Teeth;
    
    // Calculate rotation ratios
    const gear1Rotations = 1;
    const gear2Rotations = (gear1Teeth / gear2Teeth).toFixed(2);
    const gear3Rotations = (gear1Teeth / gear3Teeth).toFixed(2);
    
    document.getElementById('gear1-info-rotations').textContent = gear1Rotations;
    document.getElementById('gear2-info-rotations').textContent = gear2Rotations;
    document.getElementById('gear3-info-rotations').textContent = gear3Rotations;
}

// Draw a gear
function drawGear(x, y, radius, teeth, toothHeight, angle, color, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    // Draw gear body
    ctx.beginPath();
    ctx.arc(0, 0, radius - toothHeight, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw center hole
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();
    
    // Draw teeth
    const toothAngle = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) {
        const startAngle = i * toothAngle;
        const endAngle = startAngle + toothAngle / 2;
        
        // Outer point of tooth
        const outerX = (radius) * Math.cos(startAngle);
        const outerY = (radius) * Math.sin(startAngle);
        
        // Tooth tip
        const tipX = (radius + toothHeight) * Math.cos(startAngle + toothAngle / 4);
        const tipY = (radius + toothHeight) * Math.sin(startAngle + toothAngle / 4);
        
        // Next outer point
        const nextOuterX = (radius) * Math.cos(endAngle);
        const nextOuterY = (radius) * Math.sin(endAngle);
        
        // Draw tooth
        ctx.beginPath();
        ctx.moveTo(outerX, outerY);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(nextOuterX, nextOuterY);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
    
    // Draw spokes
    const spokeCount = Math.min(6, Math.max(3, Math.floor(teeth / 8)));
    const spokeAngle = (Math.PI * 2) / spokeCount;
    const innerRadius = radius * 0.2;
    const outerRadius = radius - toothHeight - 5;
    
    ctx.lineWidth = 4;
    for (let i = 0; i < spokeCount; i++) {
        const spokeAnglePos = i * spokeAngle;
        const innerX = innerRadius * Math.cos(spokeAnglePos);
        const innerY = innerRadius * Math.sin(spokeAnglePos);
        const outerX = outerRadius * Math.cos(spokeAnglePos);
        const outerY = outerRadius * Math.sin(spokeAnglePos);
        
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
    }
    
    // Draw label
    ctx.restore();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + radius + toothHeight + 20);
}

// Draw all gears
function drawGears() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate gear sizes based on teeth count
    const baseRadius = 15;
    const toothHeight = 8;
    
    const gear1Radius = baseRadius + gear1Teeth * 1.5;
    const gear2Radius = baseRadius + gear2Teeth * 1.5;
    const gear3Radius = baseRadius + gear3Teeth * 1.5;
    
    // Draw gears
    drawGear(gear1X, gear1Y, gear1Radius, gear1Teeth, toothHeight, angle, gear1Color, 'Gear 1');
    
    // Calculate angles for other gears based on teeth ratio
    const gear2Angle = -angle * (gear1Teeth / gear2Teeth);
    const gear3Angle = -angle * (gear1Teeth / gear3Teeth);
    
    drawGear(gear2X, gear2Y, gear2Radius, gear2Teeth, toothHeight, gear2Angle, gear2Color, 'Gear 2');
    drawGear(gear3X, gear3Y, gear3Radius, gear3Teeth, toothHeight, gear3Angle, gear3Color, 'Gear 3');
    
    // Draw connecting lines to show gear relationships
    ctx.beginPath();
    ctx.moveTo(gear1X + gear1Radius, gear1Y);
    ctx.lineTo(gear2X - gear2Radius, gear2Y);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(gear2X + gear2Radius, gear2Y);
    ctx.lineTo(gear3X - gear3Radius, gear3Y);
    ctx.stroke();
    
    // Reset line dash
    ctx.setLineDash([]);
    
    // Draw engaged teeth indicators
    drawEngagedTeeth(gear1X, gear1Y, gear1Radius, gear2X, gear2Y, gear2Radius);
    drawEngagedTeeth(gear2X, gear2Y, gear2Radius, gear3X, gear3Y, gear3Radius);
}

// Draw indicators for engaged teeth
function drawEngagedTeeth(x1, y1, r1, x2, y2, r2) {
    // Calculate the point between gears
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / dist;
    const ny = dy / dist;
    
    const p1x = x1 + nx * r1;
    const p1y = y1 + ny * r1;
    const p2x = x2 - nx * r2;
    const p2y = y2 - ny * r2;
    
    // Draw engagement indicator
    ctx.beginPath();
    ctx.arc((p1x + p2x) / 2, (p1y + p2y) / 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4500';
    ctx.fill();
}

// Animation function
function animate() {
    angle += 0.01 * animationSpeed;
    drawGears();
    animationId = requestAnimationFrame(animate);
}

// Add instructions on page load
window.addEventListener('load', function() {
    alert('Click on the canvas to start/stop the animation. Use the controls to adjust gear parameters and click "Update Gears" to apply changes.');
});
