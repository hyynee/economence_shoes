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
      onClose();
    }
  })

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
        <h2 className='text-lg font-semibold mb-4 text-center'>THÊM NHÀ CUNG CẤP</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* ID */}
          <div className="mb-4">
            <input
              type="number"
              name='supplierId'
              placeholder="Nhập ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formik.values.supplierId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.supplierId && formik.errors.supplierId ? (
              <div className="text-red-500 text-sm">{formik.errors.supplierId}</div>
            ) : null}
          </div>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name='supplierName'
              placeholder="Nhập Tên Nhà Cung Cấp"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formik.values.supplierName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.supplierName && formik.errors.supplierName ? (
            <div className="text-red-500 text-sm">{formik.errors.supplierName}</div>
          ) : null}
          {/* Address*/}
          <div className="mb-4">
            <input
              type="text"
              name='supplierAddress'
              placeholder="Nhập Địa Chỉ"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formik.values.supplierAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.supplierAddress && formik.errors.supplierAddress ? (
            <div className="text-red-500 text-sm">{formik.errors.supplierAddress}</div>
          ) : null}
          {/* Phone Number */}
          <div className="mb-4">
            <input
              type="text"
              name='phoneNumber'
              placeholder="Nhập Số Điện Thoại"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          {/* Nút thêm và hủy */}
          <div className="flex justify-end">
            <button onClick={onClose} type="button" className="bg-gray-400 text-white px-4 py-2 rounded mr-2">
              Hủy
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add