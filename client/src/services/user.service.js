import { api } from "../config/api.js";

export const changePassword = async (formData) => {
    try {
        const res = await api.patch(`/user`,
            formData,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't update password")
        throw error;
    }
}


export const loginHistory = async () => {
    try {
        const res = await api.get(`/user/logins`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't show login history")
        throw error;
    }
}