import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import useAdminProducts from '../../../customhooks/AdminHooks/useAdminProducts';
import ConfirmModal from '../../../Modal/ConfirmModal';
import { productColumns } from '../../../util/ProductHelper';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Products = () => {
  const dispatch = useDispatch();
  const {
    arrProd,
    searchTerm,
    setSearchTerm,
    addProduct,
    deleteProduct,
    updateProduct
  } = useAdminProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteProduct(selectedProductId);
    setIsDeleteModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const columns = productColumns(handleDeleteProduct, handleEditProduct);

  return (
    <div className='container mx-auto p-4 md:p-6'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-4 rounded-md shadow'>
        <input
          type="text"
          placeholder='Search...'
          className='text-sm focus:outline-none h-10 w-full md:w-96 border border-gray-300 rounded-md px-4 shadow-sm'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={openModal}
          className="w-auto text-sm md:text-base bg-green-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200">
          Add Product New
        </button>
      </div>

      <DataTable
        columns={columns}
        data={arrProd}
        selectableRows
        fixedHeader
        pagination
        highlightOnHover
        pointerOnHover
        className="border border-gray-300 rounded-lg shadow-lg bg-white min-w-[500px]"
      />
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} onAdd={addProduct} />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onEdit={updateProduct}
      />
      {/* Modal xác nhận xóa sản phẩm */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Products;
