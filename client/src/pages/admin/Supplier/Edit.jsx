import React, { useEffect, useState } from 'react';

const Edit = ({ isOpen, onClose, supplier, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Chỉnh sửa Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label>Full Name</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
          </div>
          <div className='mb-4'>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
          </div>
          <div className='mb-4'>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm w-full h-10 px-2"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white mr-2">
            Save
          </button>
          <button type="submit" className="px-4 py-2 bg-gray-600 text-white" onClick={onClose}>
            Cancle
          </button>
        </form>
      </div>
    </div>
  )
}

export default Edit