import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config().parsed;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'auctions',
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Error uploading image to Cloudinary');
    }
};

export default uploadImage;   