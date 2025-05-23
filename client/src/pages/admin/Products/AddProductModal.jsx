import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../../components/Loading/Loading';
import { getAllBrandActionAPI } from '../../../redux/brandReducer/brandReducer';
import { getAllCategoriesApi } from '../../../redux/categoryReducer/categoryReducer';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productsReducer.loading);
  const { categories } = useSelector((state) => state.categoryReducer);
  const { arrBrand } = useSelector((state) => state.brandReducer);
  console.log(categories)
  useEffect(() => {
    dispatch(getAllCategoriesApi());
    dispatch(getAllBrandActionAPI());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      productId: '',
      productName: '',
      productPrice: '',
      inputPrice: '',
      imageFile: null,
      categoryId: 0,
      brandId: 0,
      country: 'Vietnam',
      yearOfProduct: new Date().getFullYear(),
      discountPercent: 0,
      quantity: 1,
    },
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
      inputPrice: Yup.number()
        .required('Giá nhập là bắt buộc')
        .min(1, 'Giá nhập phải lớn hơn 0'),
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
      quantity: Yup.number()
        .required('Số lượng là bắt buộc')
        .min(1, 'Số lượng phải lớn hơn 0')
        .integer('Số lượng phải là số nguyên'),
    }),
    onSubmit: async (values) => {
      const newProduct = {
        product_id: Number(values.productId),
        product_name: values.productName,
        output_price: Number(values.productPrice),
        input_price: Number(values.inputPrice),
        image_file: values.imageFile,
        category_id: Number(values.categoryId),
        brand_id: Number(values.brandId),
        country: values.country,
        year_of_product: Number(values.yearOfProduct),
        discount_percent: Number(values.discountPercent),
        quantity: Number(values.quantity),
      };
      await onAdd(newProduct);
      formik.resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {loading && <Loading />}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Thêm sản phẩm mới</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="productId"
              placeholder="ID sản phẩm"
              value={formik.values.productId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.productId && formik.errors.productId ? (
              <div className="text-red-500 text-sm">{formik.errors.productId}</div>
            ) : null}
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá nhập</label>
            <input
              type="number"
              name="inputPrice"
              placeholder="Giá nhập sản phẩm"
              value={formik.values.inputPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.inputPrice && formik.errors.inputPrice ? (
              <div className="text-red-500 text-sm">{formik.errors.inputPrice}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="quantity"
              placeholder="Số lượng"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
            ) : null}
          </div>
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
          <div className="mb-4">
            <select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            >
              <option value={0}>Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div className="text-red-500 text-sm">{formik.errors.categoryId}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <select
              name="brandId"
              value={formik.values.brandId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            >
              <option value={0}>Chọn thương hiệu</option>
              {arrBrand.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
            {formik.touched.brandId && formik.errors.brandId ? (
              <div className="text-red-500 text-sm">{formik.errors.brandId}</div>
            ) : null}
          </div>
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
          <div className="flex justify-end">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? 'Đang xử lý...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;