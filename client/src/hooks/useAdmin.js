import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminDashboard,
  getAllUsers,
  updateUserRole,
  deleteUser,
  toggleUserStatus,
} from "../services/admin.service.js";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
  });
};

export const useGetAllUsers = (
  page = 1,
  search = "",
  role = "all",
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
) => {
  return useQuery({
    queryKey: ["allUsers", page, search, role, limit, sortBy, sortOrder],
    queryFn: () => getAllUsers(page, search, role, limit, sortBy, sortOrder),
    keepPreviousData: true,
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, newRole }) => updateUserRole(userId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      queryClient.invalidateQueries(["adminDashboard"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      queryClient.invalidateQueries(["adminDashboard"]);
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }) => toggleUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      queryClient.invalidateQueries(["adminDashboard"]);
    },
  });
};
