// Conversion factor from cm to pixels (1 cm = 37.7952755906 pixels)
const CM_TO_PIXELS = 37.7952755906;
document.getElementById('file').addEventListener('change', function (event) {
    const fileInput = event.target;
    const fileUploadContainer = document.querySelector('.file-upload-container');
    const loaderContainer = document.querySelector('.loader-container');
    const resizeImageContainer = document.querySelector('.resize-image');
    const uploadedImage = document.getElementById('uploadedImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onloadstart = function () {
            loaderContainer.style.display = '';
            fileUploadContainer.style.display = 'none';
        };

        reader.onload = function (e) {
            setTimeout(function () {
                loaderContainer.style.display = 'none';
                resizeImageContainer.style.display = '';
            }, 2000);

            uploadedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});

const downloadButton = document.getElementById('downloadImage');
downloadButton.addEventListener('click', function () {
    const resizedImage = document.getElementById('uploadedImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Get width and height from input fields and convert cm to px
    const widthCm = parseFloat(document.getElementById('imageWidthCm').value) || 0;
    const heightCm = parseFloat(document.getElementById('imageHeightCm').value) || 0;
    
    // Convert cm to pixels
    canvas.width = widthCm * CM_TO_PIXELS;
    canvas.height = heightCm * CM_TO_PIXELS;

    // Draw the image on the canvas
    ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);

    // Create a download link and click it to download the image
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/jpeg');
    downloadLink.download = 'resized_image.jpg';
    downloadLink.click();
});