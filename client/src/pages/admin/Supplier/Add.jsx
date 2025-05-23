import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const Add = ({ isOpen, onClose, onAdd }) => {
  const formik = useFormik({
    initialValues: {
      supplierId: '',
      supplierName: '',
      supplierAddress: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      supplierId: Yup.number()
        .required('ID cửa hàng là bắt buộc')
        .positive('ID phải là số dương')
        .integer('ID phải là số nguyên'),
      supplierName: Yup.string()
        .required('Tên nhà cung cấp là bắt buộc')
        .min(3, 'Tên nhà cung cấp phải có ít nhất 3 ký tự')
        .max(100, 'Tên nhà cung cấp không được vượt quá 100 ký tự'),
      supplierAddress: Yup.string()
        .required('Địa chỉ là bắt buộc')
        .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Số điện thoại phải chứa từ 10 đến 15 chữ số')
        .required('Số điện thoại là bắt buộc'),
    }),
    onSubmit: async (values) => {
      const newSupplier = {
        supplier_id: values.supplierId,
        supplier_name: values.supplierName,
        address: values.supplierAddress,
        phone_number: values.phoneNumber,
      };
      await onAdd(newSupplier);
      formik.resetForm();
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className='text-xl font-semibold mb-6 text-center text-gray-800'>THÊM NHÀ CUNG CẤP</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Nhà Cung Cấp</label>
            <input
              type="number"
              name='supplierId'
              placeholder="Nhập ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.supplierId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.supplierId && formik.errors.supplierId ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.supplierId}</div>
            ) : null}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên Nhà Cung Cấp</label>
            <input
              type="text"
              name='supplierName'
              placeholder="Nhập Tên Nhà Cung Cấp"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.supplierName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.supplierName && formik.errors.supplierName ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.supplierName}</div>
            ) : null}
          </div>

          {/* Address*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa Chỉ</label>
            <input
              type="text"
              name='supplierAddress'
              placeholder="Nhập Địa Chỉ"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.supplierAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.supplierAddress && formik.errors.supplierAddress ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.supplierAddress}</div>
            ) : null}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số Điện Thoại</label>
            <input
              type="text"
              name='phoneNumber'
              placeholder="Nhập Số Điện Thoại"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>

          {/* Nút thêm và hủy */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add;