import React, { useState } from 'react';
import { PROVINCES } from '../../../util/PROVINCES';

const FilterOrder = ({
    setFilterStatus,
    setStartDate,
    setEndDate,
    setLocation,
    filterStatus,
    startDate,
    endDate,
    location
}) => { 
    const locationOptions = PROVINCES;

    const [showFilters, setShowFilters] = useState(false);

    // Reset các bộ lọc
    const clearFilters = () => {
        setFilterStatus('');
        setStartDate('');
        setEndDate('');
        setLocation('');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                {showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}
            </button>

            {showFilters && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-10 border border-gray-200">
                    <div className="space-y-4">
                        {/* Lọc theo trạng thái */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái giao hàng
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                <option value="">Tất cả</option>
                                <option value="pending">Pending</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>

                        {/* Lọc theo khoảng thời gian */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Từ ngày
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đến ngày
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        {/* Lọc theo địa điểm */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Địa điểm giao hàng
                            </label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                <option value="">Tất cả</option>
                                {locationOptions.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Nút xóa bộ lọc */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterOrder;