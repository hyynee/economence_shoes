import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../Modal/ConfirmModal';
import EditModal from '../pages/admin/Customer/Edit';
import { AdminDeleteAccountActionAPI, AdminGetAllUserActionAPI, AdminUpdateAccountActionAPI } from '../redux/userReducer/userReducer';

export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Account ID</h1>,
        selector: row => row.account_id,
        sortable: true,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">ID</span>
                    </div>
                    <span className="text-gray-800 font-medium">{row.account_id}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Full Name</h1>,
        selector: row => row.full_name,
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.full_name)}&background=random`}
                            alt={row.full_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-gray-800 font-medium block">{row.full_name}</span>
                        <span className="text-gray-500 text-sm">Member</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Email</h1>,
        selector: row => row.email,
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{row.email}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Role</h1>,
        selector: row => row.role_id,
        width: "140px",
        cell: row => (
            <div className="py-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center space-x-1 ${row.role_id === 1
                    ? 'bg-blue-100 text-blue-800'
                    : row.role_id === 2
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                    {row.role_id === "Admin" ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Admin</span>
                        </>
                    ) : row.role_id === "User" ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>User</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Staff</span>
                        </>
                    )}
                </span>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Actions</h1>,
        cell: row => <CustomerButton row={row} account_id={row.account_id} />,
        width: "200px"
    }
];

export const CustomerButton = ({ row }) => {
    const dispatch = useDispatch();
    const getUserApi = async () => {
        const action = AdminGetAllUserActionAPI();
        dispatch(action)
    }
    useEffect(() => {
        getUserApi();
    }, [])
    const { account_id, full_name, email, role_id } = row;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            await dispatch(AdminDeleteAccountActionAPI(account_id));
            await getUserApi();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const handleOpenEditModal = () => {
        setSelectedAccount({ account_id, full_name, email, role_id });
        setIsEditModalOpen(true);
    };
    const handleUpdateAccount = async (updatedAccount) => {
        const action = AdminUpdateAccountActionAPI(updatedAccount);
        await dispatch(action);
        getUserApi();
        setIsEditModalOpen(false);
    }
    return (
        <div className="flex space-x-2 items-center py-4">
            <button
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center space-x-1 shadow-sm hover:shadow-md"
                onClick={handleOpenEditModal}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
            </button>
            <button
                className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 flex items-center space-x-1 shadow-sm hover:shadow-md"
                onClick={handleOpenDeleteModal}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
            </button>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                account={selectedAccount}
                onSave={handleUpdateAccount}
            />
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
                message="Are you sure you want to delete this account?"
            />
        </div>
    )
}