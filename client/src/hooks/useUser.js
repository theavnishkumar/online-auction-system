import { useQuery, useMutation } from "@tanstack/react-query";
import { changePassword, loginHistory } from "../services/user.service.js";

export const useChangePassword = (options = {}) => {
  return useMutation({
    mutationFn: (formData) => changePassword(formData),
    ...options,
  });
};

export const useLoginHistory = () => {
  return useQuery({
    queryKey: ["loginHistory"],
    queryFn: loginHistory,
  });
};
