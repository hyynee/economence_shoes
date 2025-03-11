import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const FilterDialog = ({ open, setOpen, setFilterKey, setSortOrder }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
            <div className="fixed inset-0 flex justify-end">
                <DialogPanel className="w-full max-w-sm bg-white shadow-xl h-full flex flex-col transform transition-all ease-in-out duration-500">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h2 className="text-lg font-semibold">Lọc sản phẩm</h2>
                        <button onClick={() => setOpen(false)}>
                            <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                        </button>
                    </div>
                    {/* Nội dung */}
                    <div className="p-4 flex-1 overflow-y-auto">
                        {/* Lọc theo tên */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Tìm theo tên</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="Nhập tên sản phẩm..."
                                onChange={(e) => setFilterKey(e.target.value)}
                            />
                        </div>
                        {/* Lọc theo giá */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Lọc theo giá</label>
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
                    <div className="border-t p-4">
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            onClick={() => setOpen(false)}
                        >
                            Áp dụng
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
