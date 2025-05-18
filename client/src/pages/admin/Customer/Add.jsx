import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const Add = ({ isOpen, onClose, onAdd }) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      roleId: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Tên đầy đủ là bắt buộc')
        .min(3, 'Tên phải có ít nhất 3 ký tự'),
      email: Yup.string()
        .required('Email là bắt buộc')
        .email('Email không hợp lệ')
        .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/, 'Email phải là địa chỉ @gmail.com hoặc @yahoo.com'),
      roleId: Yup.string()
        .required('Vai trò là bắt buộc')
        .oneOf(['1', '2'], 'Vai trò không hợp lệ'),
      password: Yup.string()
        .required('Mật khẩu là bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    }),
    onSubmit: async (values) => {
      const newAccount = {
        full_name: values.fullName,
        email: values.email,
        role_id: values.roleId,
        password: values.password,
      };
      await onAdd(newAccount);
      formik.resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Thêm tài khoản mới</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Trường tên đầy đủ */}
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              placeholder="Tên đầy đủ"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
            ) : null}
          </div>

          {/* Trường email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Trường vai trò */}
          <div className="mb-4">
            <select
              name="roleId"
              value={formik.values.roleId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            >
              <option value="">Chọn vai trò</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
            {formik.touched.roleId && formik.errors.roleId ? (
              <div className="text-red-500 text-sm">{formik.errors.roleId}</div>
            ) : null}
          </div>

          {/* Trường mật khẩu */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
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
  );
};

export default Add;
