import { useState } from "react";
import { useDispatch } from "react-redux";
import EditGood from "../pages/admin/Goodsreceipt/EditGood";
import ViewDetail from "../pages/admin/Goodsreceipt/ViewDetail";

export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Receipt ID</h1>,
        selector: row => row.receipt_id,
        sortable: true,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">#</span>
                    </div>
                    <span className="text-gray-800 font-medium">{row.receipt_id}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Supplier</h1>,
        selector: row => row.supplier?.supplier_name,
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.supplier?.supplier_name || '')}&background=random`}
                            alt={row.supplier?.supplier_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-gray-800 font-medium block">{row.supplier?.supplier_name}</span>
                        <span className="text-gray-500 text-sm">Supplier</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Date</h1>,
        selector: row => new Date(row.date).toLocaleDateString(),
        width: "180px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{new Date(row.date).toLocaleDateString()}</span>
                </div>
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
        cell: row => <GoodsButton row={row} />,
        width: "220px"
    }
]

export const GoodsButton = ({ row }) => {
    const dispatch = useDispatch();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleViewModalOpen = () => {
        setSelectedReceipt(row);
        setIsViewModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsViewModalOpen(false);
        setSelectedReceipt(null);
    };

    const handleEditModalOpen = () => {
        setSelectedReceipt(row);
        setIsEditModalOpen(true);
    };

    const handleEditCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedReceipt(null);
    }

    return (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center py-4">
            <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 w-full sm:w-auto"
                onClick={handleViewModalOpen}
                disabled={loading}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Details</span>
            </button>

            <ViewDetail
                isOpen={isViewModalOpen}
                onClose={handleCloseModal}
                receipt={selectedReceipt}
            />
            <EditGood
                isOpen={isEditModalOpen}
                onClose={handleEditCloseModal}
                receipt={selectedReceipt}
            />
        </div>
    )
}