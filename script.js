const gridContainer = document.querySelector('.grid-container');
const classic = document.querySelector('.classic');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
const shader = document.querySelector('.shader');
const buttons = document.querySelectorAll("button");


let color = '#706d6e'

for (let i = 0; i < 256; i++) {
  const gridItem = document.createElement('div');
  
  gridItem.classList.add('grid-item');
  gridItem.style.backgroundColor = '#c9cacb';
  gridContainer.appendChild(gridItem);

  gridItem.addEventListener('mouseover', function() {
    let currentColor = window.getComputedStyle(gridItem).backgroundColor;
    console.log(`Current Color: ${currentColor}`);
    if (gridContainer.classList.contains("rainbow")) {
        color = getRandomRGB()
        gridItem.style.backgroundColor = color
    }
    else if (gridContainer.classList.contains("shader")) {
        color = adjustColorTowardsTarget(currentColor, '#706d6e', 0.2)
        gridItem.style.backgroundColor = color
    }
    else if (gridContainer.classList.contains("lightener")) {
        color = adjustColorTowardsTarget(currentColor, '#c9cacb', 0.2)
        gridItem.style.backgroundColor = color
    }
    else {
        gridItem.style.backgroundColor = color;
    }

    console.log(`Mouse over on div ${i + 1}`);
  });
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        gridContainer.classList.remove('rainbow')
        gridContainer.classList.remove('shader')
        gridContainer.classList.remove('lightener')

        if (button.className === "clear") {
            gridItems = document.querySelectorAll(".grid-item");
            gridItems.forEach((item) => {
                item.style.backgroundColor = '#c9cacb'
            });
            color = '#706d6e'
        }
        else {
            if (button.className === "classic")
                color = '#706d6e'
            else if (button.className === "eraser")
                color = '#c9cacb'
            else if (button.className === "rainbow")
                gridContainer.classList.add('rainbow')
            else if (button.className === "shader")
                gridContainer.classList.add('shader')
            else if (button.className === "lightener")
                gridContainer.classList.add('lightener')
        }
    });
});

function getRandomRGB() {
    // Generate random values for red, green, and blue (0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Return the RGB color as a string
    return `rgb(${r}, ${g}, ${b})`;
  }

function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    console.log("result:" + result)
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
    }
    return result;
}

function adjustColorTowardsTarget(currentColor, targetColor, factor) {
    // Extract the RGB values from the current color string
    const currentRgb = currentColor.match(/\d+/g).map(Number); // Matches and extracts only the RGB values

    const targetRgb = hexToRgb(targetColor);

    const newColorRgb = interpolateColor(currentRgb, targetRgb, factor);

    return rgbToHex(newColorRgb[0], newColorRgb[1], newColorRgb[2]);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
    ];
}



