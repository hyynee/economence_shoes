import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderUserApi } from '../../redux/orderReducer/orderReducer';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { arrOrder } = useSelector(state => state.orderReducer);
    const navigate = useNavigate();

    useEffect(() => {
        // Initial fetch
        dispatch(getOrderUserApi());

        // Set up polling every 30 seconds
        const intervalId = setInterval(() => {
            dispatch(getOrderUserApi());
        }, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleRowClick = (order) => {
        navigate(`/order/${order.order_id}`, { state: { order } });
    };

    return (
        <div className='container mx-auto p-4 max-w-7xl sm:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className='bg-gray-300 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className="px-4 py-2 sm:py-3">Order ID</th>
                            <th className="px-4 py-2 sm:py-3">Order Date</th>
                            <th className='px-4 py-2 sm:py-3'>Shipping Address</th>
                            <th className='px-4 py-2 sm:py-3'>Items</th>
                            <th className="px-4 py-2 sm:py-3">Total Price</th>
                            <th className="px-4 py-2 sm:py-3">Payment Status</th>
                            <th className="px-4 py-2 sm:py-3">Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrOrder.length > 0 ? (
                            arrOrder.map(order => (
                                <tr
                                    key={order.order_id}
                                    className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(order)}
                                >
                                    <td className="px-4 py-2 sm:py-3">{order.order_id}</td>
                                    <td className="px-4 py-2 sm:py-3">{new Date(order.order_date).toLocaleDateString()}</td>
                                    <td className='px-4 py-2 sm:py-3'>{order.shipping_address}</td>
                                    <td className='px-4 py-2 sm:py-3'>{order.order_items.length}</td>
                                    <td className="px-4 py-2 sm:py-3">${order.total_price}</td>
                                    <td className='px-4 py-2 sm:py-3'>
                                        <span
                                            className={`${order.payment_status === "completed" ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium`}
                                        >
                                            {order.payment_status === "completed" ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className='px-4 py-2 sm:py-3'>
                                        <span
                                            className={`${order.delivery_status === "delivered" ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium`}
                                        >
                                            {order.delivery_status === "delivered" ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-700 py-4">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
