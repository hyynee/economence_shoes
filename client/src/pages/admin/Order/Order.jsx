import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderActionApi } from '../../../redux/orderReducer/orderReducer';
import { columns } from '../../../util/OrderDepartmentHelper';

const Order = () => {
  const {arrOrder} = useSelector(state => state.orderReducer);
  const dispatch = useDispatch();
  const getOrderApi = async () => {
    const action = getAllOrderActionApi();
    dispatch(action)
  }
  useEffect(() => {
    getOrderApi();
  }, []);
  
  return (
    <div className='container'>
      <div className='p-5'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Order Departments</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <input type="text" placeholder='Search By Dep Name' className='px-4 py-1 border' />
                    
                </div>
                <div className='mt-5'>
                    <DataTable
                        columns={columns}
                        data={arrOrder}
                        pagination
                    />
                </div>
            </div>
    </div>
  )
}

export default Order