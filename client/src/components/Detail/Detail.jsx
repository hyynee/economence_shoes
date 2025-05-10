import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import useProductDetail from '../../customhooks/useProductDetail';

const Detail = () => {
    const { id } = useParams();
    const { prodDetail, loading, error, quantity, handleChangeQuantity, handleAddtoCart } = useProductDetail(id);
    const { arrProd } = useSelector(state => state.productsReducer);
    const relatedProducts = useMemo(() => arrProd || [], [arrProd]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
    );

    return (
        <div className='container mx-auto p-4 max-w-7xl'>
            <div className="flex flex-col lg:flex-row gap-12 items-start bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className='w-full lg:w-1/2 group'>
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={prodDetail.image_path ? `http://localhost:8080/public${prodDetail.image_path}` : '/placeholder.jpg'}
                            alt={prodDetail.product_name || "Product Image"}
                            className='w-full transform transition-transform duration-500 group-hover:scale-105'
                        />
                    </div>
                </div>
                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                    <div className="space-y-4">
                        <h1 className='text-3xl font-bold text-gray-900'>{prodDetail.product_name}</h1>
                        <div className="flex items-center gap-2">
                            <span className='px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium'>
                                {prodDetail.category?.category_name}
                            </span>
                            <span className='px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium'>
                                {prodDetail.brand?.brand_name}
                            </span>
                        </div>
                    </div>

                    <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Country</p>
                                <p className="font-medium">{prodDetail.country}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Year</p>
                                <p className="font-medium">{prodDetail.year_of_product}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-2xl font-bold text-indigo-600">${prodDetail.output_price?.toFixed(2)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Stock</p>
                                <p className={`font-medium ${prodDetail.quantity === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    {prodDetail.quantity === 0 ? 'Out of Stock' : `${prodDetail.quantity} available`}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mt-4'>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                            <button
                                className='w-10 h-10 flex items-center justify-center rounded-lg bg-white text-indigo-600 text-xl font-bold shadow-sm hover:bg-indigo-50 transition-colors'
                                onClick={() => handleChangeQuantity('decrement')}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <span className='w-12 text-center font-medium'>{quantity}</span>
                            <button
                                className='w-10 h-10 flex items-center justify-center rounded-lg bg-white text-indigo-600 text-xl font-bold shadow-sm hover:bg-indigo-50 transition-colors'
                                onClick={() => handleChangeQuantity('increment')}
                                disabled={quantity >= prodDetail.quantity}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className='flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
                            onClick={handleAddtoCart}
                            disabled={prodDetail.quantity === 0}
                        >
                            {prodDetail.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>

            <div className='mt-16'>
                <h2 className='text-3xl font-bold mb-8'>Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {relatedProducts.map((item) => (
                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            key={item.product_id}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={`http://localhost:8080/public${item.image_path}`}
                                    alt={item.product_name}
                                    className="w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">
                                    {item.product_name}
                                </h3>
                                <div className='space-y-2'>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-indigo-600">${item.output_price?.toFixed(2)}</span>
                                        <span className="text-sm text-gray-500">{item.year_of_product}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{item.country}</span>
                                        <span className={item.quantity === 0 ? 'text-red-500' : 'text-green-500'}>
                                            {item.quantity === 0 ? 'Out of Stock' : `${item.quantity} in stock`}
                                        </span>
                                    </div>
                                </div>
                                <NavLink
                                    to={`/detail/${item.product_id}`}
                                    className="block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    View Details
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detail;
