import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './Add';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className='container'>
      <div className='p-5'>
        <div className="text-center">
          <h3 className='text-2xl font-bold'>Category Department</h3>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2"
            onClick={openModal}
          >
            Add Category
          </button>
        </div>
        <div className='mt-5'>
          <DataTable />
          <Add isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  )
}

export default Category