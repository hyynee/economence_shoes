import React from 'react';
import { GrSafariOption } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import useTableCart from '../../customhooks/useTableCart';
import ConfirmModal from '../../Modal/ConfirmModal';

const TableCart = () => {
  const {
    cart,
    isModalOpen,
    isClearCartModalOpen,
    setIsModalOpen,
    setIsClearCartModalOpen,
    setSelectedProductId,
    handleChangeQuantity,
    handleConfirmRemove,
    handleClearCart,
    handleConfirmClearCart,
    makePayment,
    subtotal
  } = useTableCart();


  return (
    <div className='container mx-auto text-black'>
      <div className="p-8">
        <h2 className='text-2xl font-semibold text-center mb-8'>Shopping Cart</h2>
        {cart.Items.length === 0 ? (
          <div className="flex flex-col items-center text-gray-700">
            <p>Your cart is currently empty</p>
            <div className="mt-4">
              <NavLink to='/' className="flex items-center text-blue-500 hover:text-blue-700">
                <GrSafariOption />
                <span className="ml-2">Start shopping</span>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className='overflow-y-auto'>
            <div className='grid grid-cols-4 gap-4 text-gray-600 uppercase mb-4 font-extrabold '>
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3 className='text-right'>Total</h3>
            </div>
            <div className='divide-y divide-gray-200'>
              {cart.Items.map(cartItem => (
                <div className='grid grid-cols-4 gap-4 py-4 items-center' key={cartItem.cart_id}>
                  <div className="flex items-center space-x-4">
                    <img src={`http://localhost:8080/public${cartItem.product.image_path}`} alt={cartItem.product.product_name} className="w-24" />
                    <div>
                      <h3 className='font-bold'>{cartItem.product.product_name}</h3>
                      <button
                        className="text-gray-400 hover:text-red-600 font-semibold"
                        onClick={() => {
                          setSelectedProductId(cartItem.product.product_id);
                          setIsModalOpen(true);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>${cartItem.product.output_price}</div>
                  <div className="flex items-center border rounded w-28">
                    <button
                      className="px-3"
                      onClick={() => handleChangeQuantity(cartItem.product.product_id, 'decrement')}
                    >-</button>
                    <span className="px-3">{cartItem.quantity}</span>
                    <button
                      className="px-3"
                      onClick={() => handleChangeQuantity(cartItem.product.product_id, 'increment')}
                    >+</button>
                  </div>
                  <div className='text-right font-semibold'>
                    ${cartItem.product.output_price * cartItem.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t mt-8 pt-4">
              <button className="px-6 py-2 border rounded hover:bg-gray-100 text-gray-600" onClick={handleClearCart}>Clear Cart</button>
              <div className='text-right'>
                <div className='text-xl font-semibold flex justify-between'>
                  <span>Subtotal</span>
                  <span className='ml-4'>$ {subtotal}</span>
                </div>
                <p className='text-sm text-gray-500 mt-1'>Taxes and shipping calculated at checkout</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={() => makePayment(cart.Items)}>Payment</button>
                <div className="mt-4">
                  <NavLink to='/' className="flex items-center text-blue-500 hover:text-blue-700">
                    <GrSafariOption />
                    <span className="ml-2">Continue shopping</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal xác nhận xóa sản phẩm */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        message="Do you want to remove this product from your cart?"
      />

      {/* Modal xác nhận xóa tất cả sản phẩm */}
      <ConfirmModal
        isOpen={isClearCartModalOpen}
        onClose={() => setIsClearCartModalOpen(false)}
        onConfirm={handleConfirmClearCart}
        message="Are you sure you want to remove all items from your cart?"
      />
    </div>
  );
};

export default TableCart;



