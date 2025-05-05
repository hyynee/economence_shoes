import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderActionApi } from '../../../redux/orderReducer/orderReducer';
import { columns } from '../../../util/OrderDepartmentHelper';
import FilterOrder from './FilterOrder'; // Sẽ tạo component này

const Order = () => {
  const { arrOrder } = useSelector(state => state.orderReducer);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Lấy tất cả đơn hàng
  const getOrderApi = async () => {
    const action = getAllOrderActionApi();
    dispatch(action)
  }

  useEffect(() => {
    getOrderApi();
  }, []);

  // Logic lọc đơn hàng
  const filteredOrders = arrOrder.filter(order => {
    // Lọc theo trạng thái giao hàng
    const statusMatch = filterStatus ? order.delivery_status === filterStatus : true;
    // Lọc theo khoảng thời gian
    let dateMatch = true;
    if (startDate && endDate) {
      const orderDate = new Date(order.order_date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      dateMatch = orderDate >= start && orderDate <= end;
    }
    // Lọc theo địa điểm
    const locationMatch = location ?
      (order.shipping_address && order.shipping_address.toLowerCase().includes(location.toLowerCase())) :
      true;
    // Lọc theo tên khách hàng
    const searchMatch = searchTerm ?
      (order.account?.full_name.toLowerCase().includes(searchTerm.toLowerCase())) :
      true;
    return statusMatch && dateMatch && locationMatch && searchMatch;
  });

  return (
    <div className='container w-full'>
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Order Departments</h3>
        </div>
        {/* Tìm kiếm theo tên khách hàng */}
        <div className='flex justify-between items-center mt-4'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search By Customer Name'
            className='px-4 py-2 border rounded-md'
          />
          {/* Lọc */}
          <FilterOrder
            setFilterStatus={setFilterStatus}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setLocation={setLocation}
            filterStatus={filterStatus}
            startDate={startDate}
            endDate={endDate}
            location={location}
          />
        </div>

        <div className='mt-5'>
          <DataTable
            columns={columns}
            data={filteredOrders}
            pagination
            persistTableHead
          />
        </div>
      </div>
    </div>
  )
}

export default Order