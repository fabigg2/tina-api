const {v2:cloudinary} = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_DINARY | 'dcbpbghxj',  
    api_key: process.env.API_KEY_DINARY | '925141458417749', 
    api_secret: process.env.API_SECRET_DINARY | '7S0mB8Z4u4jzu4E-Y7Gdb32ASyU' ,
    secure: true
});

const uploadImage =async (file) => {
        const resp = await cloudinary.uploader.upload(file);
        return resp.secure_url;
}


const deleteImage = async (imageUrl) => {
    const imageUrlSplited = imageUrl.split('/');
    const imageName = imageUrlSplited[imageUrlSplited.length-1];
    const [id] = imageName.split('.');
    const resp = await cloudinary.uploader.destroy(id);
    return resp;
}

module.exports = {uploadImage, deleteImage};