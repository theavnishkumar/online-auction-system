import axios from "axios";
const VITE_AUCTION_API = import.meta.env.VITE_AUCTION_API;

export const getAuctions = async () => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting auction data", error.message);
    }
}

export const viewAuction = async (id) => {
    try {
        const res = await axios.get(`${VITE_AUCTION_API}/${id}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting auction data", error.message);
    }
}

export const placeBid = async ({ bidAmount, id }) => {
    try {
        const res = await axios.post(`${VITE_AUCTION_API}/${id}`,
            { bidAmount },
            { withCredentials: true }
        )
        return res.data;
    } catch (error) {
        console.log("Error placing bid", error.message);
    }
}

export const createAuction = async (data) => {
    try {

        const formData = new FormData();
        formData.append("itemName", data.itemName);
        formData.append("startingPrice", data.startingPrice);
        formData.append("itemDescription", data.itemDescription);
        formData.append("itemCategory", data.itemCategory);
        formData.append("itemStartDate", data.itemStartDate);
        formData.append("itemEndDate", data.itemEndDate);
        formData.append("itemPhoto", data.itemPhoto);

        const res = await axios.post(`${VITE_AUCTION_API}/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // if using cookies/session for auth
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error creating auction", error.message);
    }
}