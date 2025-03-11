import React, { useEffect } from 'react';
import { IoBag, IoCart, IoCash, IoPeople } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStaActionAPI } from '../../../../redux/statisticalReducer/statisticalReducer';
import Card from './Card';
import './Card.css';
const Container = () => {
  const dispatch = useDispatch();
  const { totalPrice } = useSelector(state => state.statisticalReducer);

  const data = {
    sales: {
      title: 'Total Sales',
      amount: '$27.420',
      growth: '+44%',
      icon: <IoCart />,
      backgroundColor: '#FFE7E7',
    },
    expenses: {
      title: 'Total Expenses',
      amount: '$12.502',
      growth: '+15%',
      icon: <IoCash />,
      backgroundColor: '#CAA6A6',
    },
    visitors: {
      title: 'Total Visitors',
      amount: '$12.000',
      growth: '+20%',
      icon: <IoPeople />,
      backgroundColor: '#B47B84',
    },
    orders: {
      title: 'Total Orders',
      amount: `${totalPrice}`,
      growth: '+10%',
      icon: <IoBag />,
      backgroundColor: '#944E63',
    }
  }
  useEffect(() => {
    dispatch(getAllStaActionAPI());
  }, [dispatch]);
  return (
    <div className='card-list mt-4'>
      {Object.keys(data).map((category, index) => (
        <Card key={index} data={data[category]}></Card>
      ))}
    </div>
  )
}

export default Container