import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import useAdminProducts from '../../../customhooks/AdminHooks/useAdminProducts';
import ConfirmModal from '../../../Modal/ConfirmModal';
import { productColumns } from '../../../util/ProductHelper';
import EditProductModal from './EditProductModal';
import './product.css';

const Products = () => {
  const {
    arrProd,
    searchTerm,
    setSearchTerm,
    deleteProduct,
    updateProduct
  } = useAdminProducts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className="container">
      <div className="header-container">
        <h1>Product Management</h1>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="table-container">
        <DataTable
          className="data-table"
          columns={columns}
          data={arrProd}
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 250px)"
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent={
            <div className="no-data">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          }
        />
      </div>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onEdit={updateProduct}
      />

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
