import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const FilterBar = ({ selectedFilter, setFilterKey, setSelectedFilter, setOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const brands = ["*", "Nike", "Converse", "Van", "Adidas", "Jodan"];
    const handleFilterClick = (brand) => {
        setFilterKey(brand);
        setSelectedFilter(brand);
        setShowDropdown(false);
    };
    return (
        <div className="mt-6">
            {/* Desktop View */}
            {!isMobile ? (
                <div className="flex gap-3 mt-2">
                    {brands.map((brand) => (
                        <button
                            key={brand}
                            className={`px-4 py-2 rounded transition ${selectedFilter === brand ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-400"
                                }`}
                            onClick={() => handleFilterClick(brand)}
                        >
                            {brand === "*" ? "All" : brand}
                        </button>
                    ))}
                    <button
                        className="ml-auto flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-400"
                        onClick={() => setOpen(true)}
                    >
                        <FunnelIcon className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                </div>
            ) : (
                // Mobile View 
                <div className="relative mt-2">
                    <button
                        className="flex justify-between items-center w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-400"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span>{selectedFilter === "*" ? "All" : selectedFilter}</span>
                        <ChevronDownIcon className="w-5 h-5" />
                    </button>

                    {showDropdown && (
                        <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-md border z-10">
                            {brands.map((brand) => (
                                <button
                                    key={brand}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-300 ${selectedFilter === brand ? "bg-blue-500 text-white" : ""
                                        }`}
                                    onClick={() => handleFilterClick(brand)}
                                >
                                    {brand === "*" ? "All" : brand}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterBar;
