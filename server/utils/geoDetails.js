import axios from "axios";

export const getLocationFromIp = async (ip) => {
  const defaultLocation = {
    country: "Unknown",
    region: "Unknown",
    city: "Unknown",
    isp: "Unknown",
  };

  try {
    // Note: ip-api.com free tier only supports HTTP.
    // Consider switching to ipapi.co or ipinfo.io for HTTPS support.
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    if (response.data.status === "success") {
      return {
        country: response.data.country,
        region: response.data.regionName,
        city: response.data.city,
        isp: response.data.isp,
      };
    } else {
      return defaultLocation;
    }
  } catch (error) {
    console.log("Geo API error:", error.message);
    return defaultLocation;
  }
};

export const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  // x-forwarded-for may contain multiple IPs: "client, proxy1, proxy2"
  const ip = forwarded ? forwarded.split(",")[0].trim() : null;
  return ip || req.socket.remoteAddress || req.ip;
};
