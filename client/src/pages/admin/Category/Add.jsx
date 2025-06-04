import React from 'react';

const Add = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add Category</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Add;