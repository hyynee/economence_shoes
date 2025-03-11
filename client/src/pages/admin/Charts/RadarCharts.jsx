import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { getTotalProfitActionApi } from '../../../redux/statisticalReducer/statisticalReducer';
const RadarCharts = () => {
  const dispatch = useDispatch();
  const totalProfit = useSelector(state => state.statisticalReducer.totalProfit);
  useEffect(() => {
    dispatch(getTotalProfitActionApi())
  }, [dispatch]);
  // chuyển thành [] để map
  const transformDataForRadar = (profitData) => {
    return [
      { subject: 'Revenue', value: profitData.total_revenue || 0, fullMark: 10000 },
      { subject: 'Cost', value: profitData.total_input_cost || 0, fullMark: 10000 },
      { subject: 'Profit', value: profitData.profit || 0, fullMark: 10000 }
    ];
  };
  const chartData = transformDataForRadar(totalProfit);
  return (
    <ResponsiveContainer width="100%" height={400} className="mt-4 bg-white rounded-lg shadow-md w-full">
      <h3 className='text-xl font-bold text-center border-b-2'>Radar Chart</h3>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 10000]} />
        <Radar name="Statistics" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>

  );
};

export default RadarCharts;
