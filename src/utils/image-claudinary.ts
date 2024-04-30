import { v2 as cloudinary, ConfigOptions } from "cloudinary";

const cloud_name = "dcbpbghxj";
const api_key = "925141458417749";
const api_secret = "7S0mB8Z4u4jzu4E-Y7Gdb32ASyU";

const configOptions: ConfigOptions = {
  api_key,
  cloud_name,
  api_secret,
  secure: true,
};

cloudinary.config({
  configOptions,
});

const uploadImage = async (file) => {  
  let  resp;
  try{
     resp = await cloudinary.uploader.upload(file);

  }catch(error){
    console.log(error);

  }
  
  return resp.secure_url;
};

const deleteImage = async (imageUrl) => {
  const imageUrlSplited = imageUrl.split("/");
  const imageName = imageUrlSplited[imageUrlSplited.length - 1];
  const [id] = imageName.split(".");
  const resp = await cloudinary.uploader.destroy(id);
  return resp;
};

export { uploadImage, deleteImage };
