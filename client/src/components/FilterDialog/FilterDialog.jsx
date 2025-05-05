import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const FilterDialog = ({
    open,
    setOpen,
    setFilterKey,
    setSortOrder,
    setSelectedBrands,
    setMinPrice,
    setMaxPrice,
    brandsList
}) => {
    const [localBrands, setLocalBrands] = useState([]);

    useEffect(() => {
        if (!open) {
            setLocalBrands([]);
        }
    }, [open]);

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setLocalBrands(prev => [...prev, value]);
        } else {
            setLocalBrands(prev => prev.filter(b => b !== value));
        }
    };

    const handleApplyFilters = () => {
        setSelectedBrands(localBrands);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10 ">
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
            <div className="fixed inset-0 flex justify-end">
                <DialogPanel className="w-full sm:max-w-sm bg-white shadow-xl h-full flex flex-col transform transition-all ease-in-out duration-500">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h2 className="text-lg font-semibold">Lọc sản phẩm</h2>
                        <button onClick={() => setOpen(false)}>
                            <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                        </button>
                    </div>

                    {/* Nội dung */}
                    <div className="p-4 flex-1 overflow-y-auto space-y-6">

                        {/* Lọc theo tên */}
                        <div>
                            <label className="block font-medium mb-1">Tìm theo tên</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Nhập tên sản phẩm..."
                                onChange={(e) => setFilterKey(e.target.value)}
                            />
                        </div>

                        {/* Lọc theo thương hiệu */}
                        <div>
                            <label className="block font-medium mb-1">Thương hiệu</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {Array.isArray(brandsList) && brandsList.length > 0 && (
                                    brandsList.map((brand) => (
                                        <label key={brand} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={brand}
                                                onChange={handleBrandChange}
                                                className="h-4 w-4"
                                            />
                                            <span>{brand}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        </div>
                        {/* Khoảng giá */}
                        <div>
                            <label className="block font-medium mb-1">Khoảng giá</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    className="w-1/2 border p-2 rounded"
                                    placeholder="Giá tối thiểu"
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                />
                                <input
                                    type="number"
                                    className="w-1/2 border p-2 rounded"
                                    placeholder="Giá tối đa"
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Sort theo giá */}
                        <div>
                            <label className="block font-medium mb-1">Sắp xếp theo giá</label>
                            <select
                                className="w-full border p-2 rounded"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="">-- Chọn --</option>
                                <option value="asc">Giá thấp đến cao</option>
                                <option value="desc">Giá cao đến thấp</option>
                            </select>
                        </div>
                    </div>

                    {/* Nút áp dụng */}
                    <div className="border-t p-4">
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            onClick={handleApplyFilters}
                        >
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
