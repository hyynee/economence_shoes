import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 className="fade-in">404 - Page Not Found</h1>
            <p className="fade-in">Bạn sẽ được chuyển hướng về trang chủ trong giây lát...</p>
        </div>
    );
};

export default NotFound;