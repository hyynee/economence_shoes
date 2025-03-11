import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import useAdminAddGoods from '../../../customhooks/AdminHooks/useAdminAddGoods';

const AddGoods = ({ isOpen, onClose, onAdd }) => {
    const { arrSupplier, userProfile, arrProd } = useAdminAddGoods();
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
            console.log("values", values);
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



    if (!isOpen) return null;
    return (
        <div className="fixed mt-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[800px]">
                <h2 className="text-xl font-bold mb-4 text-center">Add Goods Receipt</h2>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* LEFT */}
                    <div className='left'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Goods Receipt Name</label>
                            <input
                                type="text"
                                name="goodsreceipt_name"
                                value={formik.values.goodsreceipt_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.goodsreceipt_name && formik.errors.goodsreceipt_name && (
                                <p className="text-red-500">{formik.errors.goodsreceipt_name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {formik.touched.date && formik.errors.date && (
                                <p className="text-red-500">{formik.errors.date}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Supplier</label>
                            <select
                                name="supplier_id"
                                value={formik.values.supplier_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">-- Chọn Nhà Cung Cấp --</option>
                                {arrSupplier.map((supplier) => (
                                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                        {supplier.supplier_name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.supplier_id && formik.errors.supplier_id && (
                                <p className="text-red-500">{formik.errors.supplier_id}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Account Name</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formik.values.full_name}
                                readOnly
                                className="w-full px-3 py-2 border rounded bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    {/* RIGHT  */}
                    <div className='right'>
                        <div className="mb-4">
                            <label className="block text-gray-700">Goods Receipt Details</label>
                            {formik.values.goodsreceipt_detail.map((detail, index) => (
                                <div key={index} className="mb-2">
                                    <select
                                        name={`goodsreceipt_detail.${index}.product_id`}
                                        value={formik.values.goodsreceipt_detail[index].product_id}
                                        onChange={(e) =>
                                            formik.setFieldValue(`goodsreceipt_detail.${index}.product_id`, Number(e.target.value))
                                        }
                                        className="w-full px-3 py-2 border rounded mb-2"
                                    >
                                        <option value="">-- Chọn Sản Phẩm --</option>
                                        {arrProd.map((product) => (
                                            <option key={product.product_id} value={product.product_id}>
                                                {product.product_name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.goodsreceipt_detail?.[index]?.product_id &&
                                        formik.errors.goodsreceipt_detail?.[index]?.product_id && (
                                            <p className="text-red-500">{formik.errors.goodsreceipt_detail[index].product_id}</p>
                                        )}
                                    <input
                                        type="number"
                                        name={`goodsreceipt_detail.${index}.quantity`}
                                        value={formik.values.goodsreceipt_detail[index].quantity}
                                        onChange={formik.handleChange}
                                        className="w-full px-3 py-2 border rounded mb-2"
                                    />
                                    <input
                                        type="number"
                                        name={`goodsreceipt_detail.${index}.input_price`}
                                        value={formik.values.goodsreceipt_detail[index].input_price}
                                        onChange={formik.handleChange}
                                        className="w-full px-3 py-2 border rounded mb-2"
                                    />

                                </div>
                            ))}
                            <div className="mb-4">
                                <label className="block text-gray-700">Total Price</label>
                                <input
                                    type="number"
                                    name="total_price"
                                    value={formik.values.total_price}
                                    readOnly
                                    className="w-full px-3 py-2 border rounded bg-gray-200 cursor-not-allowed"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="col-span-2 flex justify-end mt-4">
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-red-500 text-white rounded mr-2">
                            Close
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddGoods;
