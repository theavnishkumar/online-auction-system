import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  origin: process.env.ORIGIN,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "7d",
  cookie_domain: process.env.COOKIE_DOMAIN, // e.g., ".ihavetech.com" for cross-subdomain
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL,
  resend_api_key: process.env.RESEND_API_KEY,
};
