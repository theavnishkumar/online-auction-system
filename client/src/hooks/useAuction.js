import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuctions,
  getMyAuctions,
  getMyBids,
  viewAuction,
  placeBid,
  createAuction,
  dashboardStats,
} from "../services/auction.service.js";

export const useGetAuctions = (page = 1) => {
  return useQuery({
    queryKey: ["auctions", page],
    queryFn: () => getAuctions({ page }),
    keepPreviousData: true,
  });
};

export const useGetMyAuctions = (page = 1) => {
  return useQuery({
    queryKey: ["myAuctions", page],
    queryFn: () => getMyAuctions({ page }),
    keepPreviousData: true,
  });
};

export const useGetMyBids = (page = 1) => {
  return useQuery({
    queryKey: ["myBids", page],
    queryFn: () => getMyBids({ page }),
    keepPreviousData: true,
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
      queryClient.invalidateQueries(["myBids"]);
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

// Prefetch helpers
export const usePrefetchHandlers = () => {
  const queryClient = useQueryClient();

  const prefetchAuction = (id) => {
    queryClient.prefetchQuery({
      queryKey: ["auction", id],
      queryFn: () => viewAuction(id),
      staleTime: 30_000,
    });
  };

  const prefetchAuctions = (page = 1) => {
    queryClient.prefetchQuery({
      queryKey: ["auctions", page],
      queryFn: () => getAuctions({ page }),
      staleTime: 30_000,
    });
  };

  const prefetchMyAuctions = (page = 1) => {
    queryClient.prefetchQuery({
      queryKey: ["myAuctions", page],
      queryFn: () => getMyAuctions({ page }),
      staleTime: 30_000,
    });
  };

  const prefetchMyBids = (page = 1) => {
    queryClient.prefetchQuery({
      queryKey: ["myBids", page],
      queryFn: () => getMyBids({ page }),
      staleTime: 30_000,
    });
  };

  const prefetchDashboard = () => {
    queryClient.prefetchQuery({
      queryKey: ["dashboardStats"],
      queryFn: dashboardStats,
      staleTime: 30_000,
    });
  };

  return {
    prefetchAuction,
    prefetchAuctions,
    prefetchMyAuctions,
    prefetchMyBids,
    prefetchDashboard,
  };
};
