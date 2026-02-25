import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuctions,
  getMyAuctions,
  viewAuction,
  placeBid,
  createAuction,
  dashboardStats,
} from "../services/auction.service.js";

export const useGetAuctions = () => {
  return useQuery({
    queryKey: ["auctions"],
    queryFn: getAuctions,
  });
};

export const useGetMyAuctions = () => {
  return useQuery({
    queryKey: ["myAuctions"],
    queryFn: getMyAuctions,
  });
};

export const useViewAuction = (id) => {
  return useQuery({
    queryKey: ["auction", id],
    queryFn: () => viewAuction(id),
    enabled: !!id,
  });
};

export const usePlaceBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bidAmount, id }) => placeBid({ bidAmount, id }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["auction", variables.id]);
      queryClient.invalidateQueries(["auctions"]);
      queryClient.invalidateQueries(["myAuctions"]);
      queryClient.invalidateQueries(["dashboardStats"]);
    },
  });
};

export const useCreateAuction = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createAuction(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["auctions"]);
      queryClient.invalidateQueries(["myAuctions"]);
      queryClient.invalidateQueries(["dashboardStats"]);
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardStats,
  });
};
