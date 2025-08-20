import axios from "axios";
const VITE_API = import.meta.env.VITE_API;

// Get admin dashboard statistics
export const getAdminDashboard = async () => {
    try {
        const res = await axios.get(`${VITE_API}/admin/dashboard`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't load admin dashboard");
        throw error;
    }
};

// Get all users with pagination and filtering
export const getAllUsers = async (page = 1, search = '', role = 'all', limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
    try {
        const res = await axios.get(`${VITE_API}/admin/users`, {
            params: { page, search, role, limit, sortBy, sortOrder },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't load users");
        throw error;
    }
};

// Update user role (future functionality)
export const updateUserRole = async (userId, newRole) => {
    try {
        const res = await axios.patch(`${VITE_API}/admin/users/${userId}/role`,
            { role: newRole },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't update user role");
        throw error;
    }
};

// Delete user (future functionality)
export const deleteUser = async (userId) => {
    try {
        const res = await axios.delete(`${VITE_API}/admin/users/${userId}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't delete user");
        throw error;
    }
};

// Block/Unblock user (future functionality)
export const toggleUserStatus = async (userId, status) => {
    try {
        const res = await axios.patch(`${VITE_API}/admin/users/${userId}/status`,
            { status },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't update user status");
        throw error;
    }
};
