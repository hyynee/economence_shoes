import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ViewDetail = ({ isOpen, onClose, receipt }) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b p-4">
                            <DialogTitle className="text-lg font-medium text-gray-900">
                                Goods Receipt Details
                            </DialogTitle>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="p-4 space-y-6">
                            {/* Receipt Summary */}
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">ID</p>
                                        <p className="font-medium">{receipt.receipt_id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Name</p>
                                        <p className="font-medium">{receipt.account?.full_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Date</p>
                                        <p className="font-medium">{new Date(receipt.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Supplier</p>
                                        <p className="font-medium">{receipt.supplier?.supplier_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Total Price</p>
                                        <p className="font-medium">{receipt.total_price} $</p>
                                    </div>
                                </div>
                            </div>

                            {/* Products Table */}
                            <div>
                                <h3 className="text-md font-medium mb-3">Products</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Qty
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Input Price
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Output Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {receipt.goodsreceipt_detail.map((detail, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img
                                                                    className="h-10 w-10 rounded-md object-cover"
                                                                    src={`http://localhost:8080/public${detail.product?.image_path || ''}`}
                                                                    alt={detail.product?.product_name || 'Product'}
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {detail.product?.product_name || "N/A"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                        {detail.quantity}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                        {detail.input_price} $
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                        {detail.product?.output_price || 0} $
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Product Images Grid */}
                            {receipt.goodsreceipt_detail.some(detail => detail.product?.image_path) && (
                                <div>
                                    <h3 className="text-md font-medium mb-3">Product Images</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {receipt.goodsreceipt_detail.map((detail, index) => (
                                            detail.product?.image_path && (
                                                <div key={index} className="rounded-md overflow-hidden bg-gray-100">
                                                    <img
                                                        src={`http://localhost:8080/public${detail.product.image_path}`}
                                                        alt={detail.product.product_name || 'Product image'}
                                                        className="w-full h-40 object-contain"
                                                    />
                                                    <div className="p-2 text-sm text-center truncate">
                                                        {detail.product.product_name}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ViewDetail;