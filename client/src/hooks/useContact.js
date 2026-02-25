import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../services/contact.service.js";

export const useSendMessage = (options = {}) => {
  return useMutation({
    mutationFn: (formData) => sendMessage(formData),
    ...options,
  });
};
