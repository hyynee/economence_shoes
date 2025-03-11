import React, { useEffect, useState } from 'react';
import { GoMoveToTop } from "react-icons/go";

const BacktoTop = () => {
    const [visible, setVisible] = useState(false);

    // Kiểm tra vị trí cuộn để hiện/ẩn nút
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={scrollToTop}
            className={`fixed bottom-16 right-4 md:bottom-6 md:right-6 z-50 bg-blue-900 bg-opacity-80 rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-500 hover:scale-110 transition-all 
            ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <button className="text-white text-center">
                <GoMoveToTop size={28} />
            </button>
        </div>
    );
};

export default BacktoTop;
