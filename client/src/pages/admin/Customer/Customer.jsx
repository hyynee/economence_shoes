import React from 'react';
import DataTable from 'react-data-table-component';
import useAdminUsers from '../../../customhooks/AdminHooks/useAdminUsers';
import { columns } from '../../../util/UserDepartmentHelper';
import Add from './Add';
const Customer = () => {
    const {
        userData,
        searchTerm,
        setSearchTerm,
        handleAddAccount,
        isModalOpen,
        openModal,
        closeModal
    } = useAdminUsers();
    return (
        <div className='container'>
            <div className='p-5'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Customer Departments</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <input
                        type="text"
                        placeholder='Search By Cus Name'
                        className='px-4 py-1 border'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className='px-4 py-1 bg-teal-600 rounded text-white'
                        onClick={openModal}
                    >Add New Account</button>
                </div>
                <div className='mt-5'>
                    <DataTable
                        columns={columns}
                        data={userData}
                        pagination
                    />
                    <Add isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddAccount}></Add>
                </div>
            </div>
        </div>
    )
}

export default Customer