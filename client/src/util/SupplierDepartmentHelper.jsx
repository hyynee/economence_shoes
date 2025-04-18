import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmModal from "../Modal/ConfirmModal";
import Edit from "../pages/admin/Supplier/Edit";
import { deleteSupplierActionAPI, updateSupplierActionAPI } from "../redux/supplierReducer/supplierReducer";


export const columns = [
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">ID</h1>,
        selector: row => <span className="text-[16px] uppercase">{row.supplier_id}</span>,
        sortable: true,
        width: "140px"
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Full Name</h1>,
        selector: row => <span className="text-[16px]">{row.supplier_name}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Address</h1>,
        selector: row => <span className="text-[16px]">{row.address}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Phone Number</h1>,
        selector: row => <span className="text-[16px]">{row.phone_number}</span>,
    },
    {
        name: <h1 className="font-semibold text-lg text-gray-700 text-center">Actions</h1>,
        cell: row => <SupplierButton row={row} supplier_id={row.supplier_id} />,
        width: "240px"
    }
]

export const SupplierButton = ({ row }) => {
    const dispatch = useDispatch();
    const { supplier_id, supplier_name, address, phone_number } = row;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        try {
            await dispatch(deleteSupplierActionAPI(supplier_id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    const handleUpdateSupplier = async (updatedSupplier) => {
        const action = updateSupplierActionAPI(updatedSupplier);
        await dispatch(action);
        closeEditModal();
    };

    return (
        <div className="flex space-x-3 items-center">
            <button className="px-3 py-1 bg-green-500 text-white font-bold" onClick={handleOpenEditModal}
            >Edit</button>
            <button
                className="px-3 py-1 bg-red-500 text-white font-bold"
                onClick={handleOpenDeleteModal}
            >
                Delete
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