const grafi = require('grafi');

export const graphics = {
  grayscale: (imgData: ImageData) => {
    let pixels = imgData.data;
    let grayscaleImage = new ImageData(imgData.width, imgData.height);

    for (let i = 0; i < pixels.length; i += 4) {
      // luma algorithm
      let grayscale =
        pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;
      grayscaleImage.data[i] = grayscale; // red
      grayscaleImage.data[i + 1] = grayscale; // green
      grayscaleImage.data[i + 2] = grayscale; // blue
      grayscaleImage.data[i + 3] = imgData.data[i + 3];
    }
    return grayscaleImage;
  },

  // grayscale: (imgData: ImageData, mode = 'luma') => grafi.grayscale(imgData, { mode: mode }),
  threshold: (imgData: ImageData, level = 127) => grafi.threshold(imgData, { level: level })
}