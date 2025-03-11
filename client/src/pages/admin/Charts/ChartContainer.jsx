import React from 'react';
import BarCharts from './BarChart';
import PieCharts from './PieCharts';
import RadarCharts from './RadarCharts';

const ChartContainer = () => {
  return (
    <div className='w-full'>
      <BarCharts />
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        <RadarCharts />
        <PieCharts />
      </div>
    </div>
  );
};

export default ChartContainer;
