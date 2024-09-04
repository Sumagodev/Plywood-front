

export const convertToBase64 = (e) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(e);
    });
};


export const convertFileToBase64 = async (e) => {
    const base64Result = await convertToBase64(e);
    return base64Result
}