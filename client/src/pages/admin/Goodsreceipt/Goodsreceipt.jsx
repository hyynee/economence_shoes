import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { addGoodsReceiptActionAPI, getAllGoodsreceiptActionAPI } from '../../../redux/goodReducer/goodReducer';
import { columns } from '../../../util/GoodsreceiptDepartments';
import AddGoods from './AddGoods';
const Goodsreceipt = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
  console.log("arrGoodsreceipt", arrGoodsreceipt);
  const filteredGoods = arrGoodsreceipt.filter(receipt =>
    receipt.goodsreceipt_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddGood = async (newReceipt) => {
    try {
      await dispatch(addGoodsReceiptActionAPI(newReceipt));
      await getAllGoodsreceipts();
      closeModal();
    } catch (error) {
      console.error("Lỗi khi thêm phiếu nhập:", error);
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>GoodsReceipt Departments</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input
            type="text"
            placeholder='Search By Receipt Name'
            className='px-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <button className='px-4 py-1 bg-teal-600 rounded text-white' onClick={openModal} onClose={closeModal}>Add New GoodsReceipt</button>
        </div>
        <div className='mt-5'>
          <DataTable
            columns={columns}
            data={filteredGoods}
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