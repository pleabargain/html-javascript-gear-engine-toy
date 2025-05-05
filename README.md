# Interactive Gear Visualization

This is an interactive web-based visualization tool that demonstrates the relationship between gears with different numbers of teeth. It shows how gears of different sizes rotate at different speeds when connected in a gear train.

## Features

- Visualize three interconnected gears with customizable teeth counts
- Interactive controls to adjust the number of teeth on each gear
- Real-time animation showing gear rotation
- Display of rotation ratios between gears
- Visual indicators for engaged teeth
- Adjustable animation speed

## How It Works

The visualization demonstrates the fundamental principle of gear ratios:

- When two gears mesh, their rotational speeds are inversely proportional to their number of teeth
- If Gear 1 has 40 teeth and Gear 2 has 20 teeth, then Gear 2 will rotate twice as fast as Gear 1
- Similarly, if Gear 3 has 10 teeth, it will rotate four times as fast as Gear 1

This relationship can be expressed as:

```
Gear 2 Rotations = (Gear 1 Teeth / Gear 2 Teeth) × Gear 1 Rotations
Gear 3 Rotations = (Gear 1 Teeth / Gear 3 Teeth) × Gear 1 Rotations
```

## Usage Instructions

1. Open `index.html` in a web browser
2. Use the input fields to set the number of teeth for each gear
3. Adjust the animation speed using the slider
4. Click the "Update Gears" button to apply your changes
5. Click on the canvas to start or stop the animation

## Example Configurations

- **Standard Configuration**: Gear 1 (40 teeth), Gear 2 (20 teeth), Gear 3 (10 teeth)
  - Gear 1 rotates once, Gear 2 rotates twice, Gear 3 rotates four times

- **Equal Gears**: Gear 1 (30 teeth), Gear 2 (30 teeth), Gear 3 (30 teeth)
  - All gears rotate at the same speed

- **Large Ratio**: Gear 1 (60 teeth), Gear 2 (15 teeth), Gear 3 (5 teeth)
  - Gear 1 rotates once, Gear 2 rotates four times, Gear 3 rotates twelve times

## Technical Implementation

The visualization is implemented using:
- HTML5 Canvas for rendering
- JavaScript for animation and interaction
- CSS for styling the user interface

No external libraries are required, making it easy to run in any modern web browser.
