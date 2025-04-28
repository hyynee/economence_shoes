import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ViewDetail = ({ isOpen, onClose, receipt }) => {
    if (!isOpen) return null;
    console.log("ViewDetail", receipt.goodsreceipt_detail);
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel className="pointer-events-auto w-screen max-w-lg transform transition duration-500 ease-in-out sm:duration-700 bg-white shadow-xl">
                            <div className="flex h-full flex-col overflow-y-scroll p-6">
                                <div className="flex items-start justify-between border-b pb-4">
                                    <DialogTitle className="text-lg font-medium text-gray-900">Goods Receipt Details</DialogTitle>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Bảng thông tin phiếu nhập hàng */}
                                <div className="mt-4">
                                    <table className="w-full text-sm text-gray-700 border border-gray-300">
                                        <thead className="text-xs uppercase bg-gray-100 border-b">
                                            <tr>
                                                <th className="px-4 py-2">Id</th>
                                                <th className="px-4 py-2">Name</th>
                                                <th className="px-4 py-2">Date</th>
                                                <th className="px-4 py-2">Supplier</th>
                                                <th className="px-4 py-2">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="px-4 py-2">{receipt.receipt_id}</td>
                                                <td className="px-4 py-2">{receipt.account?.full_name || "N/A"}</td>
                                                <td className="px-4 py-2">{new Date(receipt.date).toLocaleDateString()}</td>
                                                <td className="px-4 py-2">{receipt.supplier?.supplier_name || "N/A"}</td>
                                                <td className="px-4 py-2">{receipt.total_price} $</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Bảng danh sách sản phẩm */}
                                <div className="mt-4">
                                    <table className="w-full text-sm text-gray-700 border border-gray-300">
                                        <thead className="text-xs uppercase bg-gray-100 border-b">
                                            <tr>
                                                <th className="px-4 py-2">Product Name</th>
                                                <th className="px-4 py-2">Quantity</th>
                                                <th className="px-4 py-2">Input Price</th>
                                                <th className="px-4 py-2">Output Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {receipt.goodsreceipt_detail.map((detail, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="px-4 py-2">{detail.product?.product_name || "N/A"}</td>
                                                    <td className="px-4 py-2 text-center">{detail.quantity}</td>
                                                    <td className="px-4 py-2 text-center">{detail.input_price} $</td>
                                                    <td className="px-4 py-2 text-center">{detail.product?.output_price || 0} $</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-2 mx-auto'>
                                    {receipt.goodsreceipt_detail.map((detail, index) => (
                                        <img key={index} src={`http://localhost:8080/public${detail.product.image_path}`} alt="..." className="aspect-square w-80 h-full mt-4 rounded-md bg-[#4c1d95] group-hover:opacity-75" />
                                    ))}
                                </div>
                                {/* Nút đóng */}
                                <div className="flex justify-end mt-8">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ViewDetail;
