import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

const OrderDetail = () => {
    const location = useLocation(); // truy cập thông tin về URL hiện tại
    const { id } = useParams();
    const { arrOrder } = useSelector(state => state.orderReducer);
    const [orderDetails, setOrderDetails] = useState(location.state?.order || null);

    useEffect(() => {
        if (!orderDetails) {
            const order = arrOrder.find(o => o.order_id.toString() === id);
            setOrderDetails(order);
        }
    }, [id, arrOrder, orderDetails]);
    if (!orderDetails) return <div className="text-center">Loading...</div>;

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Detail</h2>
            <div className='p-4 sm:p-6 rounded-lg border-solid border-2 border-gray-800 shadow-md'>
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold'>Order ID: #{orderDetails.order_id}</h3>
                        <p>{new Date(orderDetails.order_date).toLocaleDateString()}</p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.payment_status === "completed" ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                            {orderDetails.payment_status === "completed" ? 'Paid' : 'Unpaid'}
                        </span>
                        <span className={`${orderDetails.delivery_status === "delivered" ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-500'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                            {orderDetails.delivery_status === "delivered" ? 'Delivered' : 'Pending'}
                        </span>
                    </div>
                </div>

                {/* Payment & Shipping Info */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                        <p>Status: {orderDetails.payment_status === "completed" ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                        <p>Address: {orderDetails.shipping_address}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="overflow-x-auto">
                    <h4 className="text-lg font-semibold mb-4">Products</h4>
                    <table className='min-w-full text-gray-600 mb-4 border'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-2 px-4'>Name</th>
                                <th className='py-2 px-4'>Price</th>
                                <th className='py-2 px-4'>Quantity</th>
                                <th className='py-2 px-4'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.order_items.map((item) => (
                                <tr key={item.order_item_id} className='border-b'>
                                    <td className='py-2 px-4  flex items-center'>
                                        <img
                                            src={`http://localhost:8080/public${item.product.image_path}`}
                                            alt={item.product.product_name}
                                            className='size-20 object-cover rounded-lg mr-4'
                                            onError={(e) => e.target.src = "/fallback-image.jpg"}
                                        />

                                        <Link to={`/detail/${item.product_id}`} className='text-blue-500 hover:underline'>
                                            {item.product.product_name}
                                        </Link>
                                    </td>
                                    <td className='py-2 px-4'>{item.price} $</td>
                                    <td className='py-2 px-4'>{item.quantity}</td>
                                    <td className='py-2 px-4'>{item.price * item.quantity} $</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Back to Orders */}
                <Link to="/my-orders" className="text-blue-500 hover:underline">Back to My Orders</Link>
            </div>
        </div>
    );
};

export default OrderDetail;
