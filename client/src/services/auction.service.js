import { api } from "../config/api.js";

// getting list of all auction
export const getAuctions = async () => {
  const res = await api.get(`/auction`);
  return res.data;
};

// getting list of my auctions
export const getMyAuctions = async () => {
  const res = await api.get(`/auction/myauction`);
  return res.data;
};

// getting single auction using _id
export const viewAuction = async (id) => {
  const res = await api.get(`/auction/${id}`);
  return res.data;
};

// placing bid for auction
export const placeBid = async ({ bidAmount, id }) => {
  const res = await api.post(`/auction/${id}/bid`, { bidAmount });
  return res.data;
};

// creating new auction
export const createAuction = async (data) => {
  const formData = new FormData();
  formData.append("itemName", data.itemName);
  formData.append("startingPrice", data.startingPrice);
  formData.append("itemDescription", data.itemDescription);
  formData.append("itemCategory", data.itemCategory);
  formData.append("itemStartDate", data.itemStartDate);
  formData.append("itemEndDate", data.itemEndDate);
  formData.append("itemPhoto", data.itemPhoto);

  const res = await api.post(`/auction`, formData);
  return res.data;
};

// getting dashboard stats
export const dashboardStats = async () => {
  const res = await api.get(`/auction/stats`);
  return res.data;
};
