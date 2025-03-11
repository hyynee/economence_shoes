import React from 'react';

const EditGood = ({ isOpen, onClose, receipt, onSave }) => {

    if (!isOpen) return null;
    return (
        <div>
            <button
                type="submit"
                className="px-4 py-2 bg-gray-600 text-white"
                onClick={onClose}>
                Close
            </button>
        </div>
    )
}

export default EditGood