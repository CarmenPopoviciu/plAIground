/**
 * See http://yann.lecun.com/exdb/mnist/ for what these algorithms should really
 * do. For now let's just assume this will do
 * 
 * TODO 
 * 
 * "The original black and white (bilevel) images from NIST were size normalized 
 * to fit in a 20x20 pixel box while preserving their aspect ratio. The resulting 
 * images contain grey levels as a result of the anti-aliasing technique used by 
 * the normalization algorithm. the images were centered in a 28x28 image by 
 * computing the center of mass of the pixels, and translating the image so as 
 * to position this point at the center of the 28x28 field."
 */

export const imageData = {
  toMNIST: (imgData: ImageData): Array<number> => {
    let pixels: Uint8ClampedArray = imgData.data;
    let mnistData = [];
    let alpha = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      alpha = pixels[i + 3];
      mnistData[i / 4] = alpha > 0 ? 1 : 0;
    }
    return mnistData;
  },

  toImage: (mnistData: Array<number>): ImageData => {
    let imgData: ImageData = new ImageData(280, 280);
    for (let i = 0; i < mnistData.length; i++) {
      imgData.data[i * 4] =
        imgData.data[i * 4 + 1] =
        imgData.data[i * 4 + 2] =
        imgData.data[i * 4 + 3] = mnistData[i] * 255;
    }
    return imgData;
  }
}

