import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { addSupplierActionAPI, getAllSupplierActionAPI } from '../../../redux/supplierReducer/supplierReducer';
import { columns } from '../../../util/SupplierDepartmentHelper';
import Add from './Add';

const Supplier = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getAllSupplierApi = async () => {
        const action = getAllSupplierActionAPI();
        dispatch(action);
    }
    useEffect(() => {
        getAllSupplierApi();
    }, []);
    const { arrSupplier } = useSelector(state => state.supplierReducer);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddSupplier = (data) => {
        const action = addSupplierActionAPI(data);
        dispatch(action);
        getAllSupplierApi();
    }

    return (
        <div className='container'>
            <div className='p-5'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Supplier Departments</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <input type="text" placeholder='Search By Dep Name' className='px-4 py-1 border' />
                    <button className='px-4 py-1 bg-teal-600 rounded text-white' onClick={openModal} onClose={closeModal}>Add New Supplier</button>
                </div>
                <div className='mt-5'>
                    <DataTable
                        columns={columns}
                        data={arrSupplier}
                        pagination
                    />
                    <Add isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddSupplier}></Add>
                </div>
            </div>
        </div>
    )
}

export default Supplier