window.onload = function () {
  slideOne();
  slideTwo();
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("num-1");
let displayValTwo = document.getElementById("num-2");
let minGap = 1;
let sliderTrack = document.getElementById("slider-track");

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.value = sliderOne.value;
  updateActiveFilterTag(); // Update the tag text dynamically
  fillColor();
}

function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.value = sliderTwo.value;
  fillColor();
}

function fillColor() {
  // Updated math for a non-zero minimum value
  let minVal = parseFloat(sliderOne.min);
  let maxVal = parseFloat(sliderOne.max);

  let percent1 = ((sliderOne.value - minVal) / (maxVal - minVal)) * 100;
  let percent2 = ((sliderTwo.value - minVal) / (maxVal - minVal)) * 100;

  sliderTrack.style.left = percent1 + "%";
  sliderTrack.style.width = percent2 - percent1 + "%";
}

function inputOne() {
  sliderOne.value = displayValOne.value;
  slideOne();
}

function inputTwo() {
  sliderTwo.value = displayValTwo.value;
  slideTwo();
}

// Dynamic tag text update
function updateActiveFilterTag() {
  document.getElementById("tag-min").innerText = sliderOne.value;
}

// Remove Tag functionality
function removeFilterTag() {
  document
    .getElementById("price-tag")
    .classList.replace("d-inline-flex", "d-none");
}

// Clear All functionality
function clearAllFilters(event) {
  event.preventDefault(); // prevents page refresh
  document.getElementById("active-filters-section").classList.add("d-none");
}

// RESET Button functionality
function resetFilters() {
  location.reload(); // Reload page to return to default state
}
