import React from "react";
import Loading from "../components/Loading/Loading";
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
    <div className="container mt-2">
      {loading && <Loading />}
      <div className="flex justify-between">
        <div className="left">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">Your Profile</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{full_name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Vai trò</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{role}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
              </div>
            </dl>
            <button
              className="mt-2 mb-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsOpen(true)}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
        <div className="right flex justify-center">
          <img src="https://i.pravatar.cc?u=1" alt="..." width="50%" className="p-2" />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900">Đổi mật khẩu</h2>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

            <div className="mt-6 flex justify-end space-x-3">
              <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400" onClick={() => setIsOpen(false)}>
                Hủy
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleChangePassword}>
                {loading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
