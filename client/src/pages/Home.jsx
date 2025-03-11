import React from 'react';
import { NavLink } from "react-router-dom";
import obj from '../assets/style/buttonCart.module.css';
import Carousel from '../components/Carousel/Carousel';
import FilterBar from '../components/FilterDialog/FilterBar';
import FilterDialog from '../components/FilterDialog/FilterDialog';
import useProducts from '../customhooks/useProducts';
const Home = () => {
  const {
    sortedProducts,
    selectedFilter,
    open,
    setFilterKey,
    setSelectedFilter,
    setOpen,
    setSortOrder,
    handleAddToCart
  } = useProducts();

  return (
    <div className='min-h-screen'>
      <div className='container bg-cover w-full carousel'>
        <Carousel />
      </div>
      { /*  hàm lọc sp theo tên */}
      <div className="container mt-6">
        <FilterBar selectedFilter={selectedFilter} setFilterKey={setFilterKey} setSelectedFilter={setSelectedFilter} setOpen={setOpen} />
      </div>
      {/* hàm filter modal*/}
      <FilterDialog open={open} setOpen={setOpen} setFilterKey={setFilterKey} setSortOrder={setSortOrder} />
      {/* Product List*/}
      <div className='container'>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => (
              <div className="w-80 p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0 hover:border-accent border-2" key={item.product_id}>
                <img src={`http://localhost:8080/public${item.image_path}`} alt="" className="aspect-square w-full rounded-md bg-[#4c1d95] object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60" />
                <div className="p-2">
                  <h2 className="font-bold text-lg mb-2 uppercase hover:text-accent">{item.product_name}</h2>
                  <div className='flex justify-between items-center'>
                    <span className="text-xl font-semibold">Price: {item.output_price}</span>
                    <span className="text-xl font-semibold">Year: {item.year_of_product}</span>
                  </div>
                  <p>Country: {item.country}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button className="px-3 py-1 rounded-lg bg-blue-300 hover:bg-gray-400 text-base">
                    <NavLink to={`/detail/${item.product_id}`}>View Detail</NavLink>
                  </button>
                  <button className={obj.button} onClick={() => handleAddToCart(item.product_id)}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                      <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                      <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Không có sản phẩm nào phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;


