import { useState } from "react";
import { useDispatch } from "react-redux";
import EditGood from "../pages/admin/Goodsreceipt/EditGood";
import ViewDetail from "../pages/admin/Goodsreceipt/ViewDetail";


export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">ID</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.receipt_id}</span>,
        sortable: true,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Suppiler</h1>,
        selector: row => <span className="text-[16px]">{row.supplier?.supplier_name}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Date</h1>,
        selector: row => <span className="text-[16px]">{new Date(row.date).toLocaleDateString()}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Total Price</h1>,
        selector: row => <span className="text-[16px]">{row.total_price}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Actions</h1>,
        cell: row => <GoodsButton row={row} />,
    }
]

export const GoodsButton = ({ row }) => {
    const disptach = useDispatch();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        <div className="flex space-x-3 items-center">
            <button
                className="px-3 py-1 bg-yellow-500 text-white font-bold rounded"
                onClick={handleViewModalOpen}>View Details
            </button>
            {/* <button
                className="px-3 py-1 bg-yellow-500 text-white font-bold rounded"
                onClick={handleEditModalOpen}>Edit
            </button> */}
            <ViewDetail
                isOpen={isViewModalOpen}
                onClose={handleCloseModal}
                receipt={selectedReceipt} />
            <EditGood
                isOpen={isEditModalOpen}
                onClose={handleEditCloseModal}
                receipt={selectedReceipt} />
        </div>
    )
}