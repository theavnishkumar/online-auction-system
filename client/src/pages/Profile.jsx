import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/user";
import { CiMail, CiUser, CiLock, CiCamera } from "react-icons/ci";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

export default function Profile() {
  const { user} = useSelector((state) => state.auth);
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => changePassword(formData),
    onSuccess: () => {
      setSuccessMessage("Password Changed Successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 10000);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error);
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsError("Please enter all fields");
      setTimeout(() => {
        setIsError("");
      }, 10000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsError("New password and confirm password do not match.");
      setTimeout(() => {
        setIsError("");
      }, 10000);
      return;
    }
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <p className="text-gray-500">
              Update your personal information and password
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="relative mb-4 sm:mb-0">
                  <img
                    src={user.user.avatar}
                    alt="User avatar"
                    className="h-20 w-20 rounded-full bg-gray-200 mx-auto sm:mx-0"
                  />
                  <button className="absolute bottom-0 right-0 sm:right-0 bg-white rounded-full p-1 border border-gray-300 shadow-sm">
                    <CiCamera className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="ml-0 sm:ml-4 text-center sm:text-left">
                  <h2 className="text-lg font-medium text-gray-900">
                    {user.user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.user.email}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              {/* Personal Information */}
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.user.name}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-400"
                        placeholder="Your full name"
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.user.email}
                        disabled
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-400"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your current password"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter new password"
                        minLength={8}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {isError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {isError}
                    </div>
                  )}

                  {/* Success Message */}
                  {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                      {successMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled
                    className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
