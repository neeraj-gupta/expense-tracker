import {
    API_PATHS
} from "./apiPaths";

import axiosInstance from "./axiosInstance";

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
        const response = await axiosInstance.post(API_PATHS.Image.UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export default uploadImage;