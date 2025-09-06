import { v2 as cloudinary } from "cloudinary";


import { cloudinaryInfo } from "../config/keys.js";
cloudinary.config({
  cloud_name: cloudinaryInfo.cloud_name,
  api_key: cloudinaryInfo.api_key,
  api_secret: cloudinaryInfo.api_secret,
});
console.log('cloudinaryInfo',cloudinaryInfo)

const cloudinaryUpload = async (image) => {
  
  try {
    let imageUrl = "";
    let imageId = "";

    if (!keys.cloudinary.apiKey) {
      console.warn("Missing Cloudinary keys");
    }

    if (image) {
      const result =  cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "uploads",
        },
        (error, result) => {
          if (error) {
            throw error;
          }
          imageUrl = result.secure_url;
          imageId = result.public_id;
        }
      );
return result
   
    }

  
  } catch (error) {
    return { imageUrl: "", imageId: "" };
  }
};


export default cloudinaryUpload