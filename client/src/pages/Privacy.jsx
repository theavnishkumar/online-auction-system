import { useState } from "react";
import { Link } from "react-router";
import {
  CiCalendar,
  CiGlobe,
  CiMapPin,
  CiServer,
  CiMonitor,
} from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { loginHistory } from "../api/user";
import LoadingScreen from "../components/LoadingScreen";

export default function Privacy() {
  const { data, isLoading } = useQuery({
    queryFn: loginHistory,
    queryKey: ["userLogins"],
    staleTime: 60 * 1000 * 5,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Page content */}
      <main className="p-4 sm:p-6 lg:p-8 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Privacy & Security
          </h1>
          <p className="text-gray-500 pb-4">
            View your login history and security settings
          </p>

          {data && (
            <div className="flex flex-col gap-4">
              {data.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                    <div className="flex items-center">
                      <CiCalendar className="size-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Date & Time:
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        {entry.dateTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiGlobe className="size-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        IP Address:
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        {entry.ipAddress}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiMapPin className="size-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Location:
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        {entry.location}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiServer className="size-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        ISP:
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        {entry.isp}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiMonitor className="size-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Device:
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        {entry.device}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security settings */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Security Settings
          </h2>
          <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-md divide-y divide-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Add an extra layer of security to your account by requiring
                    a verification code in addition to your password.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    disabled
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 cursor-not-allowed"
                  >
                    Enable
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Password
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Change you password
                  </p>
                </div>
                <div className="ml-4">
                  <Link
                    to="/profile"
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
