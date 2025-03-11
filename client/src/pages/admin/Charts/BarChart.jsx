import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { getBestSellingProductsAPI } from '../../../redux/statisticalReducer/statisticalReducer';

const BarCharts = () => {
    const dispatch = useDispatch();
    const bestSellingProducts = useSelector(state => state.statisticalReducer.bestSellingProducts);

    useEffect(() => {
        dispatch(getBestSellingProductsAPI());
    }, [dispatch]);

    const chartData = bestSellingProducts.map(product => ({
        name: product.product_name,
        Soluong: product.total_quantity_sold,
        Doanhthu: product.total_revenue,
        Chiphi: product.total_cost
    }));

    return (
        <div className="mt-4 bg-white rounded-lg shadow-md p-4 w-full">
            <h3 className="text-lg font-semibold mb-3">Thống Kê Bán Hàng</h3>
            <BarChart width={850} height={500} data={chartData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="Soluong" fill="#8884d8" barSize={30} name="Số lượng bán" />
                <Bar dataKey="Doanhthu" fill="#82ca9d" barSize={30} name="Doanh thu" />
                <Bar dataKey="Chiphi" fill="#ff6f61" barSize={30} name="Chi phí nhập vào" />
            </BarChart>
        </div>
    );
};

export default BarCharts;
