import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import useAdminAddGoods from '../../../customhooks/AdminHooks/useAdminAddGoods';
import { AdminAddProdActionApi } from '../../../redux/productReducer/productsReducer';
import AddProductModal from '../Products/AddProductModal';

const AddGoods = ({ isOpen, onClose, onAdd }) => {
    const dispatch = useDispatch();
    const { arrSupplier, userProfile, arrProd } = useAdminAddGoods();
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [lastAddedProduct, setLastAddedProduct] = useState(null);

    useEffect(() => {
        if (arrProd && arrProd.length > 0) {
            setProducts([...arrProd]);

            if (lastAddedProduct && lastAddedProduct.product_id) {
                const newAddedProduct = arrProd.find(p => p.product_id === lastAddedProduct.product_id);
                if (newAddedProduct) {
                    addProductToReceipt(newAddedProduct);
                    setLastAddedProduct(null);
                }
            }
        }
    }, [arrProd, lastAddedProduct]);

    useEffect(() => {
        if (userProfile?.data?.full_name) {
            formik.setFieldValue('full_name', userProfile.data.full_name);
        }
    }, [userProfile]);

    const formik = useFormik({
        initialValues: {
            goodsreceipt_name: '',
            date: '',
            supplier_id: '',
            full_name: userProfile?.data?.full_name || '',
            goodsreceipt_detail: [
                {
                    product_id: '',
                    quantity: 0,
                    input_price: 0,
                }
            ],
            total_price: 0,
        },
        validationSchema: Yup.object({
            goodsreceipt_name: Yup.string()
                .required('Tên phiếu nhập hàng là bắt buộc')
                .min(3, 'Tên phải có ít nhất 3 ký tự'),
            date: Yup.date()
                .required('Ngày nhập là bắt buộc'),
            supplier_id: Yup.number()
                .required('Nhà cung cấp là bắt buộc'),
            goodsreceipt_detail: Yup.array().of(
                Yup.object({
                    product_id: Yup.number().required('Sản phẩm là bắt buộc'),
                    quantity: Yup.number()
                        .required('Số lượng là bắt buộc')
                        .min(1, 'Số lượng phải lớn hơn 0'),
                    input_price: Yup.number()
                        .required('Giá nhập là bắt buộc')
                        .min(1, 'Giá nhập phải lớn hơn 0'),
                })
            )
        }),
        onSubmit: async (values) => {
            const newReceipt = {
                goodsreceipt_name: values.goodsreceipt_name,
                date: new Date(values.date),
                total_price: values.total_price,
                supplier_id: Number(values.supplier_id),
                account_id: userProfile?.data?.account_id || 0,
                goodsreceipt_detail: values.goodsreceipt_detail.map(detail => ({
                    product_id: Number(detail.product_id),
                    quantity: Number(detail.quantity),
                    input_price: Number(detail.input_price)
                }))
            };
            await onAdd(newReceipt);
            onClose();
        }
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    useEffect(() => {
        const total = formik.values.goodsreceipt_detail.reduce((sum, detail) => {
            return sum + (Number(detail.quantity) || 0) * (Number(detail.input_price) || 0);
        }, 0);
        formik.setFieldValue('total_price', total);
    }, [formik.values.goodsreceipt_detail]);

    const addProductToReceipt = (product) => {
        if (formik.values.goodsreceipt_detail.length === 1 &&
            !formik.values.goodsreceipt_detail[0].product_id) {
            formik.setFieldValue('goodsreceipt_detail.0.product_id', product.product_id);
            formik.setFieldValue('goodsreceipt_detail.0.quantity', 1);
            formik.setFieldValue('goodsreceipt_detail.0.input_price', product.input_price || 0);
        } else {
            formik.setFieldValue('goodsreceipt_detail', [
                ...formik.values.goodsreceipt_detail,
                {
                    product_id: product.product_id,
                    quantity: 1,
                    input_price: product.input_price || 0
                }
            ]);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const result = await dispatch(AdminAddProdActionApi(newProduct));
            if (result.payload && result.payload.product_id) {
                setLastAddedProduct(result.payload);
            }
            setShowAddProductModal(false);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };

    const addDetailRow = () => {
        formik.setFieldValue('goodsreceipt_detail', [
            ...formik.values.goodsreceipt_detail,
            { product_id: '', quantity: 0, input_price: 0 }
        ]);
    };

    const removeDetailRow = (index) => {
        if (formik.values.goodsreceipt_detail.length > 1) {
            const newDetails = [...formik.values.goodsreceipt_detail];
            newDetails.splice(index, 1);
            formik.setFieldValue('goodsreceipt_detail', newDetails);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-center">Add Goods Receipt</h2>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Goods Receipt Name</label>
                                    <input
                                        type="text"
                                        name="goodsreceipt_name"
                                        value={formik.values.goodsreceipt_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {formik.touched.goodsreceipt_name && formik.errors.goodsreceipt_name && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.goodsreceipt_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {formik.touched.date && formik.errors.date && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                                    <select
                                        name="supplier_id"
                                        value={formik.values.supplier_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-- Chọn Nhà Cung Cấp --</option>
                                        {arrSupplier.map((supplier) => (
                                            <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                                {supplier.supplier_name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.supplier_id && formik.errors.supplier_id && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.supplier_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formik.values.full_name}
                                        readOnly
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Product Details */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Goods Receipt Details</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddProductModal(true)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            Thêm SP Mới
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addDetailRow}
                                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                                        >
                                            + Thêm dòng
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 max-h-[300px] overflow-y-auto p-1">
                                    {formik.values.goodsreceipt_detail.map((detail, index) => (
                                        <div key={index} className="border rounded-lg p-3 bg-gray-50">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-medium text-sm">Chi tiết #{index + 1}</h4>
                                                {formik.values.goodsreceipt_detail.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDetailRow(index)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                                    >
                                                        Xóa
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Sản phẩm</label>
                                                    <select
                                                        name={`goodsreceipt_detail.${index}.product_id`}
                                                        value={formik.values.goodsreceipt_detail[index].product_id}
                                                        onChange={(e) =>
                                                            formik.setFieldValue(`goodsreceipt_detail.${index}.product_id`, Number(e.target.value))
                                                        }
                                                        className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">-- Chọn Sản Phẩm --</option>
                                                        {products.map((product) => (
                                                            <option key={product.product_id} value={product.product_id}>
                                                                {product.product_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formik.touched.goodsreceipt_detail?.[index]?.product_id &&
                                                        formik.errors.goodsreceipt_detail?.[index]?.product_id && (
                                                            <p className="mt-1 text-xs text-red-600">{formik.errors.goodsreceipt_detail[index].product_id}</p>
                                                        )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Số lượng</label>
                                                    <input
                                                        type="number"
                                                        name={`goodsreceipt_detail.${index}.quantity`}
                                                        value={formik.values.goodsreceipt_detail[index].quantity}
                                                        onChange={formik.handleChange}
                                                        min="1"
                                                        className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    {formik.touched.goodsreceipt_detail?.[index]?.quantity &&
                                                        formik.errors.goodsreceipt_detail?.[index]?.quantity && (
                                                            <p className="mt-1 text-xs text-red-600">{formik.errors.goodsreceipt_detail[index].quantity}</p>
                                                        )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Giá nhập</label>
                                                    <input
                                                        type="number"
                                                        name={`goodsreceipt_detail.${index}.input_price`}
                                                        value={formik.values.goodsreceipt_detail[index].input_price}
                                                        onChange={formik.handleChange}
                                                        min="1"
                                                        className="w-full px-2 py-1 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    {formik.touched.goodsreceipt_detail?.[index]?.input_price &&
                                                        formik.errors.goodsreceipt_detail?.[index]?.input_price && (
                                                            <p className="mt-1 text-xs text-red-600">{formik.errors.goodsreceipt_detail[index].input_price}</p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tổng giá</label>
                                        <input
                                            type="number"
                                            name="total_price"
                                            value={formik.values.total_price}
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6 mt-4 border-t">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={showAddProductModal}
                onClose={() => setShowAddProductModal(false)}
                onAdd={handleAddProduct}
            />
        </div>
    );
};

export default AddGoods;