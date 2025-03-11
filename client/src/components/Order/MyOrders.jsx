import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderUserApi } from '../../redux/orderReducer/orderReducer';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { arrOrder } = useSelector(state => state.orderReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderUserApi());
    }, [dispatch]);

    const handleRowClick = (order) => {
        navigate(`/order/${order.order_id}`, { state: { order } });
    };
    return (
        <div className='container mx-auto p-4 max-w-7xl sm:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-300 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className="px-4 py-2 sm:py-3">Order ID</th>
                            <th className="px-4 py-2 sm:py-3">Order Date</th>
                            <th className='px-4 py-2 sm:py-3'>Shipping Address</th>
                            <th className='px-4 py-2 sm:py-3'>Items</th>
                            <th className="px-4 py-2 sm:py-3">Total Price</th>
                            <th className="px-4 py-2 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrOrder.length > 0 ? (
                            arrOrder.map(order => (
                                <tr key={order.order_id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleRowClick(order)}>
                                    <td className="px-4 py-2 sm:py-3">{order.order_id}</td>
                                    <td className="px-4 py-2 sm:py-3">{new Date(order.order_date).toLocaleDateString()}</td>
                                    <td className='px-4 py-2 sm:py-3'>{order.shipping_address}</td>
                                    <td className='px-4 py-2 sm:py-3'>{order.order_items.length}</td>
                                    <td className="px-4 py-2 sm:py-3">{order.total_price} $</td>
                                    <td className='px-4 py-2 sm:py-3'>
                                        <span
                                            className={`${order.payment_status ? 'bg-green-300' : 'bg-yellow-500'} text-white text-xs font-bold px-2 py-1`}
                                        >
                                            {order.payment_status ? 'Completed' : 'No Completed'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-700">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
