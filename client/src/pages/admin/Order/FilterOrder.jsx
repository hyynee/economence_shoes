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
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            {showFilters && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-xl rounded-lg p-6 z-10 border border-gray-200">
                    <div className="space-y-6">
                        {/* Filter Header */}
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Filter Orders</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Reset Filters</span>
                            </button>
                        </div>

                        {/* Delivery Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Delivery Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                />
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Delivery Location
                            </label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            >
                                <option value="">All Locations</option>
                                {locationOptions.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Apply Filters Button */}
                        <div className="pt-4 border-t">
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterOrder;