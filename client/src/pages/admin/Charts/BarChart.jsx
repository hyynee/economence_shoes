import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { getBestSellingProductsAPI, getTopCustomersAPI } from '../../../redux/statisticalReducer/statisticalReducer';

const BarCharts = () => {
  const dispatch = useDispatch();
  const bestSellingProducts = useSelector(state => state.statisticalReducer.bestSellingProducts);
  const topCustomersFromRedux = useSelector(state => state.statisticalReducer.topCustomers);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // Format về dạng yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split('T')[0];
  // Gán mặc định
  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortedCustomers, setSortedCustomers] = useState([]);

  useEffect(() => {
    dispatch(getBestSellingProductsAPI());
    dispatch(getTopCustomersAPI(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    if (topCustomersFromRedux) {
      const copied = [...topCustomersFromRedux];
      copied.sort((a, b) => sortOrder === 'asc' ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent);
      setSortedCustomers(copied);
    }
  }, [topCustomersFromRedux, sortOrder]);

  const handleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('USD', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const chartData = bestSellingProducts.map(product => ({
    name: product.product_name,
    Soluong: product.total_quantity_sold,
    Doanhthu: product.total_revenue,
    Chiphi: product.total_cost
  }));

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md p-4 w-full">
      <h3 className="text-lg font-semibold mb-3">Thống Kê Bán Hàng</h3>

      {/* Biểu đồ cột */}
      <BarChart width={850} height={500} data={chartData}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="Soluong" fill="#8884d8" barSize={30} name="Số lượng bán" />
        <Bar dataKey="Doanhthu" fill="#82ca9d" barSize={30} name="Doanh thu" />
        <Bar dataKey="Chiphi" fill="#ff6f61" barSize={30} name="Chi phí nhập vào" />
      </BarChart>

      {/* Bộ lọc ngày */}
      <div className="mb-6 flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>

      {/* Bảng khách hàng */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Top 5 Khách Hàng Mua Hàng Nhiều Nhất</h3>
          <button
            onClick={handleSort}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sắp xếp {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map((customer) => (
                <tr key={customer.account_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {customer.orders.map(order => (
                        <div key={order.id} className="mb-1">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {order.id} - {new Date(order.date).toLocaleDateString()}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;
