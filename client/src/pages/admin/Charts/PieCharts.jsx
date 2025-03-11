import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { getTotalProfitActionApi } from '../../../redux/statisticalReducer/statisticalReducer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize="14px"
            fontWeight="bold"
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieCharts = () => {
    const dispatch = useDispatch();
    const totalProfit = useSelector(state => state.statisticalReducer.totalProfit);

    useEffect(() => {
        dispatch(getTotalProfitActionApi());
    }, [dispatch]);
    // [] để map
    const chartData = [
        { name: 'Revenue', value: totalProfit.total_revenue || 0 },
        { name: 'Cost', value: totalProfit.total_input_cost || 0 },
        { name: 'Profit', value: totalProfit.profit || 0 }
    ];
    return (
        <ResponsiveContainer width="100%" height={400} className="mt-4 bg-white rounded-lg shadow-md w-full">
            <h3 className='text-xl font-bold text-center border-b-2'>Pie Chart</h3>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieCharts;
