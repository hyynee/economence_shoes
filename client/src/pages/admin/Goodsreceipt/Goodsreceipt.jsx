import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { addGoodsReceiptActionAPI, getAllGoodsreceiptActionAPI } from '../../../redux/goodReducer/goodReducer';
import { columns } from '../../../util/GoodsreceiptDepartments';
import AddGoods from './AddGoods';
const Goodsreceipt = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllGoodsreceipts = async () => {
    const action = getAllGoodsreceiptActionAPI();
    dispatch(action);
  }
  useEffect(() => {
    getAllGoodsreceipts();
  }, [])
  const { arrGoodsreceipt } = useSelector(state => state.goodReducer);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddGood = (newReceipt) => {
    const action = addGoodsReceiptActionAPI(newReceipt);
    dispatch(action);
  }

  return (
    <div className='container mx-auto'>
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>GoodsReceipt Departments</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Search By Dep Name' className='px-4 py-1 border' />
          <button className='px-4 py-1 bg-teal-600 rounded text-white' onClick={openModal} onClose={closeModal}>Add New GoodsReceipt</button>
        </div>
        <div className='mt-5'>
          <DataTable
            columns={columns}
            data={arrGoodsreceipt}
            pagination
            className="border border-gray-300 rounded-lg shadow-lg bg-white min-w-[500px]"
          />
          <AddGoods isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddGood}></AddGoods>
        </div>
      </div>
    </div>
  )
}

export default Goodsreceipt