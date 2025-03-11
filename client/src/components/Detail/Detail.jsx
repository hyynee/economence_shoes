import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import useProductDetail from '../../customhooks/useProductDetail';
const Detail = () => {
    const { id } = useParams();
    const { prodDetail, loading, error, quantity, handleChangeQuantity, handleAddtoCart } = useProductDetail(id);
    const { arrProd } = useSelector(state => state.productsReducer);
    const relatedProducts = useMemo(() => arrProd || [], [arrProd]);
    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className='container mx-auto p-4 max-w-5xl'>
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-white p-6 rounded-lg shadow-lg">
                <div className='w-full lg:w-1/2'>
                    <img
                        src={prodDetail.image_path ? `http://localhost:8080/public${prodDetail.image_path}` : '/placeholder.jpg'}
                        alt={prodDetail.product_name || "Product Image"}
                        className='shadow-lg rounded-lg w-full'
                    />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                    <span className='text-indigo-600 font-semibold tracking-wide text-2xl'>Special Sneaker</span>
                    <table className='table'>
                        <tbody>
                            <tr><td>Product Name:</td><td>{prodDetail.product_name}</td></tr>
                            <tr><td>Category:</td><td>{prodDetail.category?.category_name}</td></tr>
                            <tr><td>Brand:</td><td>{prodDetail.brand?.brand_name}</td></tr>
                            <tr><td>Country:</td><td>{prodDetail.country}</td></tr>
                            <tr><td>Year:</td><td>{prodDetail.year_of_product}</td></tr>
                            <tr><td>Price:</td><td>{prodDetail.output_price?.toFixed(2)}$</td></tr>
                            <tr><td>Stock:</td><td className={prodDetail.quantity === 0 ? 'text-red-500' : ''}>{prodDetail.quantity}</td></tr>
                        </tbody>
                    </table>
                    <div className='flex items-center gap-4 mt-2'>
                        <button className='bg-gray-300 py-2 px-4 rounded-lg text-violet-600 text-xl font-bold'
                            onClick={() => handleChangeQuantity('decrement')} disabled={quantity === 1}>-</button>
                        <span className='text-sm font-medium'>{quantity}</span>
                        <button className='bg-gray-300 py-2 px-4 rounded-lg text-violet-600 text-xl font-bold'
                            onClick={() => handleChangeQuantity('increment')}
                            disabled={quantity >= prodDetail.quantity}>+</button>
                        <button className='button bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300'
                            onClick={handleAddtoCart} disabled={prodDetail.quantity === 0}>
                            {prodDetail.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold'>Related Products</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {relatedProducts.map((item) => (
                        <div className="w-80 p-2 bg-white rounded-xl shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0 border-2" key={item.product_id}>
                            <img src={`http://localhost:8080/public${item.image_path}`} alt={item.product_name} className="aspect-square w-full rounded-md object-cover" />
                            <div className="p-2">
                                <h2 className="font-bold text-lg mb-2 uppercase">{item.product_name}</h2>
                                <div className='flex justify-between items-center'>
                                    <span className="text-xl font-semibold">Price: {item.output_price?.toFixed(2)}$</span>
                                    <span className="text-xl font-semibold">Year: {item.year_of_product}</span>
                                </div>
                                <p>Country: {item.country}</p>
                                <p>Stock: {item.quantity}</p>
                            </div>
                            <NavLink to={`/detail/${item.product_id}`} className="px-3 py-1 rounded-lg bg-blue-300 hover:bg-gray-400 flex justify-center">View Detail</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detail;
