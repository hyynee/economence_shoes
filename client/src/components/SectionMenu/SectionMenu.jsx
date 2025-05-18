import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SectionMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        category: '',
        gender: '',
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 5000000,
    });
    const [price, setPrice] = useState([0, 5000000]);

    const categories = ["C1", "C2", "C3"];
    const brands = ["Nike", "Converse", "Van", "Adidas", "Jordan"];
    const genders = ["Men", "Women", "Unisex"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilter({
            category: params.category || '',
            gender: params.gender || '',
            brand: params.brand ? params.brand.split(',') : [],
            minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
            maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 5000000,
        });
        setPrice([0, params.maxPrice ? Number(params.maxPrice) : 5000000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newFilter = { ...filter };
        if (type === 'checkbox') {
            if (checked) {
                newFilter[name] = [...newFilter[name], value];
            } else {
                newFilter[name] = newFilter[name].filter((item) => item !== value);
            }
        } else {
            newFilter[name] = value;
        }
        setFilter(newFilter);
        setSearchParams(new URLSearchParams(newFilter).toString());
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        const newFilter = { ...filter, maxPrice: value };
        setPrice([price[0], value]);
        setFilter(newFilter);
        setSearchParams(new URLSearchParams(newFilter).toString());
    };

    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filters</h3>
            {/* Category */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {categories.map((category, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input
                            type="radio" name="category" id={category}
                            value={category}
                            checked={filter.category === category}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor={category} className='ml-2'>{category}</label>
                    </div>
                ))}
            </div>
            {/* Gender */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {genders.map((gender, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input
                            type="radio" name="gender" id={gender}
                            value={gender}
                            checked={filter.gender === gender}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor={gender} className='ml-2'>{gender}</label>
                    </div>
                ))}
            </div>
            {/* Brand */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brands.map((brand, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input
                            type="checkbox" name="brand" id={brand} value={brand}
                            className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-400'
                            onChange={handleFilterChange}
                        />
                        <span className='ml-2 text-gray-600'>{brand}</span>
                    </div>
                ))}
            </div>
            {/* Price */}
            <div className="mb-8">
                <label className='block text-gray-600 font-medium mb-2'>Price</label>
                <input
                    type="range" name="priceRange" min={0} max={5000000}
                    value={price[1] !== undefined ? price[1] : 5000000}
                    onChange={handlePriceChange}
                />
                <div className='flex justify-between'>
                    <span>0</span>
                    <span>{price[1].toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
        </div>
    );
};

export default SectionMenu;