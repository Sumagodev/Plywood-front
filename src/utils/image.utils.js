export function getCroppedImg(imageSrc, croppedAreaPixels) {
    const img = new Image();
    img.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'));
                return;
            }
            resolve(URL.createObjectURL(blob));
        }, 'image/jpeg');
    });
}

export default getCroppedImg;

export const handleOpenImageInNewTab = (base64File) => {
    const newTab = window.open();

    newTab?.document.write(
        `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${base64File}" width="100px" height="100px" ></body></html>`);

    newTab?.document.close();
}