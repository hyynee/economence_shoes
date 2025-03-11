import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { http } from '../../../util/config';

const EditProductModal = ({ isOpen, onClose, product, onEdit }) => {
    const formik = useFormik({
        initialValues: {
            productId: product?.product_id || '',
            productName: product?.product_name || '',
            productPrice: product?.output_price || '',
            imageFile: null,
            categoryId: product?.category_id || '',
            brandId: product?.brand_id || '',
            country: product?.country || '',
            yearOfProduct: product?.year_of_product || new Date().getFullYear(),
            discountPercent: product?.discount_percent || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            productId: Yup.number()
                .required('ID sản phẩm là bắt buộc')
                .positive('ID phải là số dương')
                .integer('ID phải là số nguyên'),
            productName: Yup.string()
                .required('Tên sản phẩm là bắt buộc')
                .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự'),
            productPrice: Yup.number()
                .required('Giá sản phẩm là bắt buộc')
                .min(1, 'Giá phải lớn hơn 0'),
            imageFile: Yup.mixed().required('Hình ảnh là bắt buộc'),
            categoryId: Yup.string().required('Danh mục là bắt buộc'),
            brandId: Yup.string().required('Thương hiệu là bắt buộc'),
            country: Yup.string()
                .required('Quốc gia là bắt buộc')
                .matches(/^[a-zA-Z\s]+$/, 'Quốc gia chỉ chứa chữ cái'),
            yearOfProduct: Yup.number()
                .required('Năm sản xuất là bắt buộc')
                .min(1900, 'Năm không hợp lệ')
                .max(new Date().getFullYear(), 'Năm không được vượt quá hiện tại'),
            discountPercent: Yup.number()
                .min(0, 'Tỷ lệ giảm giá không hợp lệ')
                .max(100, 'Tỷ lệ giảm giá không hợp lệ'),
        }),
        onSubmit: async (values) => {
            const image_path = await http.postForm(`products/upLoadImage`, { image: values.imageFile });
            const fullPath = image_path.data.path;
            let imagePath = fullPath.split('public')[1].replace(/\\/g, '/').replace(/^\+/, '');
            const updatedProduct = {
                product_id: Number(values.productId),
                product_name: values.productName,
                output_price: Number(values.productPrice),
                image_path: imagePath,
                category_id: values.categoryId,
                brand_id: values.brandId,
                country: values.country,
                year_of_product: Number(values.yearOfProduct),
                discount_percent: Number(values.discountPercent),
            };
            onEdit(updatedProduct);
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
                <h2 className="text-lg font-semibold mb-4 text-center">Chỉnh sửa sản phẩm</h2>
                <form onSubmit={formik.handleSubmit}>
                    {/* Trường ID sản phẩm */}
                    <div className="mb-4 bg-black">
                        <input
                            type="text"
                            name="productId"
                            placeholder="ID sản phẩm"
                            value={formik.values.productId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-900 rounded-sm w-full h-10 px-2 block text-white text-center font-bold"
                            disabled
                        />
                        {formik.touched.productId && formik.errors.productId ? (
                            <div className="text-red-500 text-sm">{formik.errors.productId}</div>
                        ) : null}
                    </div>


                    {/* Trường tên sản phẩm */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="productName"
                            placeholder="Tên sản phẩm"
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.productName && formik.errors.productName ? (
                            <div className="text-red-500 text-sm">{formik.errors.productName}</div>
                        ) : null}
                    </div>

                    {/* Trường giá sản phẩm */}
                    <div className="mb-4">
                        <input
                            type="number"
                            name="productPrice"
                            placeholder="Giá sản phẩm"
                            value={formik.values.productPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.productPrice && formik.errors.productPrice ? (
                            <div className="text-red-500 text-sm">{formik.errors.productPrice}</div>
                        ) : null}
                    </div>

                    {/* Trường hình ảnh */}
                    <div className="mb-4">
                        <input
                            type="file"
                            name="imageFile"
                            onChange={(event) => formik.setFieldValue('imageFile', event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.imageFile && formik.errors.imageFile ? (
                            <div className="text-red-500 text-sm">{formik.errors.imageFile}</div>
                        ) : null}
                    </div>

                    {/* Trường danh mục */}
                    <div className="mb-4">
                        <select
                            name="categoryId"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        >
                            <option value="">Chọn danh mục</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                            <option value="C3">C3</option>
                        </select>
                        {formik.touched.categoryId && formik.errors.categoryId ? (
                            <div className="text-red-500 text-sm">{formik.errors.categoryId}</div>
                        ) : null}
                    </div>

                    {/* Trường thương hiệu */}
                    <div className="mb-4">
                        <select
                            name="brandId"
                            value={formik.values.brandId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        >
                            <option value="">Chọn thương hiệu</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="B3">B3</option>
                        </select>
                        {formik.touched.brandId && formik.errors.brandId ? (
                            <div className="text-red-500 text-sm">{formik.errors.brandId}</div>
                        ) : null}
                    </div>

                    {/* Trường quốc gia */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="country"
                            placeholder="Quốc gia"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.country && formik.errors.country ? (
                            <div className="text-red-500 text-sm">{formik.errors.country}</div>
                        ) : null}
                    </div>

                    {/* Trường năm sản xuất */}
                    <div className="mb-4">
                        <input
                            type="number"
                            name="yearOfProduct"
                            placeholder="Năm sản xuất"
                            value={formik.values.yearOfProduct}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.yearOfProduct && formik.errors.yearOfProduct ? (
                            <div className="text-red-500 text-sm">{formik.errors.yearOfProduct}</div>
                        ) : null}
                    </div>

                    {/* Trường tỷ lệ giảm giá */}
                    <div className="mb-4">
                        <input
                            type="number"
                            name="discountPercent"
                            placeholder="Tỷ lệ giảm giá (%)"
                            value={formik.values.discountPercent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                        {formik.touched.discountPercent && formik.errors.discountPercent ? (
                            <div className="text-red-500 text-sm">{formik.errors.discountPercent}</div>
                        ) : null}
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancle
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
