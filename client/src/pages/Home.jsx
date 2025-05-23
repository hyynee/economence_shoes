import { StarIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import BestSellers from "../components/BestSellers/BestSellers";
import Carousel from '../components/Carousel/Carousel';
import FilterBar from '../components/FilterDialog/FilterBar';
import FilterDialog from '../components/FilterDialog/FilterDialog';
import useProducts from '../customhooks/useProducts';

const Home = () => {
  // State cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const {
    sortedProducts,
    selectedFilter,
    open,
    setFilterKey,
    setSelectedBrands,
    setSelectedFilter,
    setOpen,
    brandsList,
    resetFilters,
    setMinPrice,
    setMaxPrice,
    setSortOrder,
    handleAddToCart
  } = useProducts();

  // Logic phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Reset về trang 1 khi thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    // Kiểm tra giới hạn trang
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    // Cuộn lên đầu trang khi chuyển trang
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen'>
      <div className='container bg-cover w-full carousel'>
        <Carousel />
      </div>
      { /*  hàm lọc sp theo tên */}
      <div className="container mt-6">
        <FilterBar
          selectedFilter={selectedFilter}
          setFilterKey={setFilterKey}
          setSelectedFilter={setSelectedFilter}
          setOpen={setOpen}
          resetFilters={resetFilters}
        />
      </div>
      {/* hàm filter modal*/}
      <FilterDialog open={open} setOpen={setOpen} setFilterKey={setFilterKey} setSortOrder={setSortOrder} brandsList={brandsList} setSelectedBrands={setSelectedBrands} setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice} />
      {/* Product List*/}
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <BestSellers />
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <motion.div
                  key={product.product_id}
                  className="group relative"
                  whileHover={{ y: -5 }}
                >
                  {/* Image Container And Detail */}
                  <NavLink to={`/detail/${product.product_id}`}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg group">
                      <motion.img
                        alt={product.product_name}
                        src={`http://localhost:8080/public${product.image_path}`}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    </div>
                  </NavLink>

                  {/* Product Info */}
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                      <NavLink to={`/detail/${product.product_id}`}>
                        {product.product_name}
                      </NavLink>
                    </h3>
                    <p className="text-sm text-gray-500">Còn {product.quantity} sản phẩm</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">${product.output_price}</p>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-500">4.8</span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleAddToCart(product.product_id);
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Thêm vào giỏ
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">Không có sản phẩm nào phù hợp.</p>
            )}
          </div>
        </motion.div>

        {/* Pagination Component */}
        {sortedProducts.length > 0 && totalPages > 1 && (
          <div className="flex justify-center my-8">
            <nav className="flex items-center space-x-2">
              {/* Previous Page Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-blue-100"
                  }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages).keys()].map((number) => {
                // Giới hạn hiển thị số trang 
                if (
                  number + 1 === 1 ||
                  number + 1 === totalPages ||
                  (number + 1 >= currentPage - 1 && number + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`px-3 py-1 rounded-md ${currentPage === number + 1
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100"
                        }`}
                    >
                      {number + 1}
                    </button>
                  );
                } else if (
                  (number + 1 === currentPage - 2 && currentPage > 3) ||
                  (number + 1 === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={number + 1} className="px-1">...</span>;
                }
                return null;
              })}

              {/* Next Page Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-blue-100"
                  }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;