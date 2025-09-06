import { config } from "dotenv";
config();
export const port = process.env.PORT || 3000;
export const database = process.env.MONGO_URI;

export const cloudinaryInfo = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const app = {
  name: "Samah Event",
  apiURL: `${process.env.BASE_API_URL}`,
  clientURL: process.env.CLIENT_URL,
};

export const jwtInfo = {
  secret: process.env.JWT_SECRET,
  tokenLife: "7d",
};
