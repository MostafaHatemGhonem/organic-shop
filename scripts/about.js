const sliderImages = [
    "C:/Users/Hamdy Mohamed/Desktop/web project/about_photos/slide (1).jpg",
    "C:/Users/Hamdy Mohamed/Desktop/web project/about_photos/slide (3).jpg",
    "C:/Users/Hamdy Mohamed/Desktop/web project/about_photos/slide (2).jpg",
    "C:/Users/Hamdy Mohamed/Desktop/web project/about_photos/tomato.jpg",
];

    let currentIdx = 0;
    const imgElement = document.getElementById('dynamic-img');

    function rotateImage() {
        currentIdx = (currentIdx + 1) % sliderImages.length;
        
        imgElement.style.opacity = '0.3';
        
        setTimeout(() => {
            imgElement.src = sliderImages[currentIdx];
            imgElement.style.opacity = '1';
        }, 400);
    }

    setInterval(rotateImage, 4000);
