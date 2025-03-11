import React, { useEffect, useState } from 'react';

const EditModal = ({ isOpen, onClose, account, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (account) {
            setFormData(account);
        }
    }, [account]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAccount = {
            ...formData,
            role_id: formData.role_id === 'Admin' ? '1' : '2'
        };
        onSave(updatedAccount);
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 shadow-lg relative z-10 max-w-lg w-full">
                <h2 className="text-lg font-semibold mb-4 text-center">Chỉnh sửa Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name || ''}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                    </div>
                    <div className='mb-4'>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        />
                    </div>
                    <div className='mb-4'>
                        <label>Role ID</label>
                        <select
                            name="role_id"
                            value={formData.role_id || ''}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-sm w-full h-10 px-2"
                        >
                            <option value="">Chọn Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
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
    );
};

export default EditModal;
