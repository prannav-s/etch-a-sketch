const gridContainer = document.querySelector('.grid-container');
const classic = document.querySelector('.classic');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
const shader = document.querySelector('.shader');
const buttons = document.querySelectorAll("button");


let color = '#706d6e'

const slider = document.getElementById('slider');
let sliderValue = document.getElementById('sliderValue');


function initializeGrid(value) {
    sliderValue.innerText = value + " x " + value;
    const gridElements = value * value;

    // Clear any existing grid items
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
        gridContainer.removeChild(item);
    });

    // Create and append new grid items
    for (let i = 0; i < gridElements; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.style.backgroundColor = '#c9cacb';
        gridItem.style.flex = `0 0 calc(100% / ${value})`;
        gridContainer.appendChild(gridItem);

        // Add mouseover event listener for color change
        console.log(`Mouse over on div ${i + 1}`);

        gridItem.addEventListener('mouseover', function () {
            let currentColor = window.getComputedStyle(gridItem).backgroundColor;
            gridItem.style.backgroundColor = chooseColor(currentColor, color);
            console.log(color)
            

        });

        gridItem.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent the default scroll behavior on touchstart
            let currentColor = window.getComputedStyle(gridItem).backgroundColor;
            gridItem.style.backgroundColor = chooseColor(currentColor, color);
          });
        
        gridItem.addEventListener('touchmove', function(e) {
            e.preventDefault(); // Prevent the default scroll behavior on touchmove
        
            const touch = e.touches[0];
            
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            // Check if the element is a grid item and change its color
            if (element && element.classList.contains('grid-item')) {
                let currentColor = window.getComputedStyle(element).backgroundColor;
                element.style.backgroundColor = chooseColor(currentColor, color);
            }
        });
    }
}

// Initialize the grid on page load
initializeGrid(slider.value);

// Update the grid when the slider value changes
slider.oninput = function () {
    initializeGrid(this.value);
};



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

function chooseColor(currentColor, color) {
    console.log(`Current Color: ${currentColor}`);
    if (gridContainer.classList.contains("rainbow")) {
        color = getRandomRGB();
    } else if (gridContainer.classList.contains("shader")) {
        color = adjustColorTowardsTarget(currentColor, '#706d6e', 0.2);
    } else if (gridContainer.classList.contains("lightener")) {
        color = adjustColorTowardsTarget(currentColor, '#c9cacb', 0.2);
    } else {
    }
    return color;
}

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



