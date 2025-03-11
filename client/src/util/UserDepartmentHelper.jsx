import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../Modal/ConfirmModal';
import EditModal from '../pages/admin/Customer/Edit';
import { AdminDeleteAccountActionAPI, AdminGetAllUserActionAPI, AdminUpdateAccountActionAPI } from '../redux/userReducer/userReducer';

export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Account ID</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.account_id}</span>,
        sortable: true,
        width: "150px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Full Name</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.full_name}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Email</h1>,
        selector: row => <span className="text-[16px]">{row.email}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Role</h1>,
        selector: row => <span className="text-[16px]">{row.role_id}</span>,
        width: "100px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Actions</h1>,
        cell: row => <CustomerButton row={row} account_id={row.account_id} />,
        width: "240px"
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
        <div className="flex space-x-3 items-center">
            <button className="px-3 py-1 bg-green-500 text-white font-bold" onClick={handleOpenEditModal}
            >Edit</button>
            <button
                className="px-3 py-1 bg-red-600 text-white font-bold"
                onClick={handleOpenDeleteModal}
            >
                Leave
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