import React, { useEffect } from 'react';
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

    useEffect(() => {
        console.log('Total users:', userData.length);
        console.log('User data:', userData);
    }, [userData]);

    const paginationOptions = {
        rowsPerPageText: 'Số hàng mỗi trang:',
        rangeSeparatorText: 'trên tổng số',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tất cả',
    };

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
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                        paginationComponentOptions={paginationOptions}
                        highlightOnHover
                        pointerOnHover
                        noDataComponent="Không có dữ liệu"
                        persistTableHead
                    />
                    <Add isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddAccount}></Add>
                </div>
            </div>
        </div>
    )
}

export default Customer