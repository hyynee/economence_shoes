import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmModal from "../Modal/ConfirmModal";
import Edit from "../pages/admin/Supplier/Edit";
import { deleteSupplierActionAPI, updateSupplierActionAPI } from "../redux/supplierReducer/supplierReducer";

export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Supplier ID</h1>,
        selector: row => row.supplier_id,
        sortable: true,
        width: "150px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">#</span>
                    </div>
                    <span className="text-gray-800 font-medium">{row.supplier_id}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Supplier Name</h1>,
        selector: row => row.supplier_name,
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.supplier_name)}&background=random`}
                            alt={row.supplier_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-gray-800 font-medium block">{row.supplier_name}</span>
                        <span className="text-gray-500 text-sm">Supplier</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Address</h1>,
        selector: row => row.address,
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">{row.address}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Phone</h1>,
        selector: row => row.phone_number,
        width: "180px",
        cell: row => (
            <div className="py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{row.phone_number}</span>
                </div>
            </div>
        )
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700">Actions</h1>,
        cell: row => <SupplierButton row={row} supplier_id={row.supplier_id} />,
        width: "220px"
    }
];

export const SupplierButton = ({ row }) => {
    const dispatch = useDispatch();
    const { supplier_id, supplier_name, address, phone_number } = row;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleOpenEditModal = () => {
        setSelectedSupplier({ supplier_id, supplier_name, address, phone_number });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedSupplier(null);
    };

    const handleDeleteSupplier = async () => {
        setLoading(true);
        try {
            await dispatch(deleteSupplierActionAPI(supplier_id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting supplier:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSupplier = async (updatedSupplier) => {
        setLoading(true);
        try {
            const action = updateSupplierActionAPI(updatedSupplier);
            await dispatch(action);
            closeEditModal();
        } catch (error) {
            console.error("Error updating supplier:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center py-4">
            <button
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 w-full sm:w-auto"
                onClick={handleOpenEditModal}
                disabled={loading}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
            </button>
            <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 w-full sm:w-auto"
                onClick={handleOpenDeleteModal}
                disabled={loading}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
            </button>

            <Edit
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                supplier={selectedSupplier}
                onSave={handleUpdateSupplier}
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteSupplier}
                message="Are you sure you want to delete this supplier?"
            />
        </div>
    )
}