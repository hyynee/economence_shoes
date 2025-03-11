import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatusApi } from "../redux/orderReducer/orderReducer";


export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Order ID</h1>,
        selector: row => <span className="text-[16px]">{row.order_id}</span>,
        sortable: true,
        width: "120px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Custormer</h1>,
        selector: row => <span>{row.account?.full_name}</span>,
        width: "130px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Order Date</h1>,
        selector: row => new Date(row.order_date).toLocaleString(),
        width: "150px"

    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Payment Status</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.payment_status}</span>,
        width: "180px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Delivery Status</h1>,
        selector: row => row.delivery_status,
        width: "170px",
        cell: row => (
            <button
                className={`
                    px-3 py-1 rounded-md text-white font-medium text-sm uppercase
                    ${row.delivery_status === "pending" ? "bg-red-500" :
                        row.delivery_status === "delivered" ? "bg-green-500" : ""}
                `}
            >
                {row.delivery_status}
            </button>
        ),
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Total Price</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.total_price}</span>,
        width: "170px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Actions</h1>,
        cell: row => <OrderButton row={row} account_id={row.account_id} />,
        width: "180px"
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
        <div className="flex space-x-3 items-center">
            <button className="px-3 py-1 bg-yellow-500 text-white font-bold"
                onClick={handleUpdateStatus}
                disabled={loading || row.delivery_status === "delivered"}
            >
                {loading ? "Updating..." : "Approve"}
            </button>

        </div>
    )
}
