const sliderImages = [
  "../assets/images/about.jpg",
  "../assets/images/about1.jpg",
  "../assets/images/about2.jpg",
  "../assets/images/about3.jpg",
];

let currentIdx = 0;
const imgElement = document.getElementById("dynamic-img");

function rotateImage() {
  currentIdx = (currentIdx + 1) % sliderImages.length;

  imgElement.style.opacity = "0.3";

  setTimeout(() => {
    imgElement.src = sliderImages[currentIdx];
    imgElement.style.opacity = "1";
  }, 400);
}

setInterval(rotateImage, 4000);
