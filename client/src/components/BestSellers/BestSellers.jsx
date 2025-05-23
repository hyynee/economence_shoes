import React from 'react';
import useProductDetail from '../../customhooks/useProductDetail';
import useProducts from '../../customhooks/useProducts';

const BestSellers = () => {
    const { bestSellers } = useProducts();

    const { handleAddtoCart } = useProductDetail(bestSellers.product_id);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        bestSellers && bestSellers.product_id > 0 ? (<div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-red-500 after:mx-auto after:mt-4">
                    Sản phẩm bán chạy
                </h2>

                {/* Product Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row">

                        {/* Main Image */}
                        <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
                            <img
                                src={`http://localhost:8080/public${bestSellers.image_path}`}
                                alt={bestSellers.product_name}
                                className="w-full max-h-96 object-contain transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                            <div className="mb-4">
                                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                                    Bán chạy nhất
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                {bestSellers?.product_name || 'Default Product Name'}
                            </h1>

                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm">(42 đánh giá)</span>
                            </div>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-red-600">
                                    {formatPrice(bestSellers?.output_price || 0)}₫
                                </span>
                                {bestSellers?.discount_percent > 0 && (
                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                        {formatPrice(bestSellers?.original_price)}₫
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-700 mb-8 leading-relaxed">
                                {bestSellers?.description || 'Không có mô tả sản phẩm.'}
                            </p>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                                    onClick={handleAddtoCart}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Còn {bestSellers?.quantity || 0} sản phẩm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>) : (
            <div className="">
                <h1 className="text-2xl font-bold text-gray-900">Không có sản phẩm nào đang bán chạy.</h1>
            </div>
        )
    );
};

export default BestSellers;