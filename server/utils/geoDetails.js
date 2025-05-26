import axios from "axios";

export const getLocationFromIp = async (ip) => {
    const defaultLocation = {
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
        isp: "Unknown",
    };

    try {
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
    return req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
};