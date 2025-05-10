import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { addSupplierActionAPI, getAllSupplierActionAPI } from '../../../redux/supplierReducer/supplierReducer';
import { columns } from '../../../util/SupplierDepartmentHelper';
import Add from './Add';

const Supplier = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredSuppliers = arrSupplier.filter(supplier =>
        supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='text-center mb-8'>
                    <h3 className='text-2xl font-bold text-gray-800'>Supplier Departments</h3>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                    <input
                        type="text"
                        placeholder='Search By Supplier Name'
                        className='px-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className='px-6 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition-colors w-full md:w-auto'
                        onClick={openModal}
                    >
                        Add New Supplier
                    </button>
                </div>

                <div className='overflow-x-auto'>
                    <DataTable
                        columns={columns}
                        data={filteredSuppliers}
                        pagination
                        responsive
                        noDataComponent="No suppliers found"
                        className="border rounded-lg"
                    />
                </div>

                <Add isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddSupplier} />
            </div>
        </div>
    )
}

export default Supplier;