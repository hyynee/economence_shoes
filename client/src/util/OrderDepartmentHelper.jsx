import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatusApi } from "../redux/orderReducer/orderReducer";

export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Order ID</h1>,
        selector: row => row.order_id,
        sortable: true,
        width: "120px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">#</span>
                    </div>
                    <span className="text-gray-800 font-medium">{row.order_id}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Customer</h1>,
        selector: row => row.account?.full_name,
        width: "200px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.account?.full_name || '')}&background=random`}
                            alt={row.account?.full_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-gray-800 font-medium block">{row.account?.full_name}</span>
                        <span className="text-gray-500 text-sm">Customer</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Order Date</h1>,
        selector: row => new Date(row.order_date).toLocaleString(),
        width: "180px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{new Date(row.order_date).toLocaleString()}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Payment Status</h1>,
        selector: row => row.payment_status,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center space-x-1 ${row.payment_status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {row.payment_status ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Paid</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Pending</span>
                        </>
                    )}
                </span>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Delivery Status</h1>,
        selector: row => row.delivery_status,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center space-x-1 ${row.delivery_status === "delivered"
                    ? 'bg-green-100 text-green-800'
                    : row.delivery_status === "pending"
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                    {row.delivery_status === "delivered" ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Delivered</span>
                        </>
                    ) : row.delivery_status === "pending" ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Pending</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            <span>Processing</span>
                        </>
                    )}
                </span>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Total Price</h1>,
        selector: row => row.total_price,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-800 font-medium">${row.total_price}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Actions</h1>,
        cell: row => <OrderButton row={row} account_id={row.account_id} />,
        width: "150px"
    }
];

export const OrderButton = ({ row }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleUpdateStatus = async () => {
        if (row.delivery_status === "delivered") return;
        setLoading(true);
        try {
            await dispatch(updateOrderStatusApi(row.order_id, "delivered"));
        } catch (error) {
            console.error("Failed to update order status", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex space-x-2 items-center py-4">
            <button
                className={`px-3 py-1.5 rounded-md text-white font-medium text-sm flex items-center space-x-1 transition-all duration-200 shadow-sm hover:shadow-md ${row.delivery_status === "delivered"
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                    }`}
                onClick={handleUpdateStatus}
                disabled={loading || row.delivery_status === "delivered"}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Updating...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Approve</span>
                    </>
                )}
            </button>
        </div>
    )
}
