import React from "react";
import Loading from "../components/Loading/Loading";
import MyOrders from "../components/Order/MyOrders";
import useProfile from "../customhooks/useProfile";

const Profile = () => {
  const {
    full_name,
    email,
    role,
    loading,
    isOpen,
    setIsOpen,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    handleChangePassword,
  } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loading && <Loading />}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Profile Info */}
            <div className="md:w-2/3 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your personal information and account settings.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{full_name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{role}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{email}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Profile Picture */}
            <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc?u=1"
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{full_name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            <MyOrders />
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                  />
                </div>

                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">{errorMessage}</div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;