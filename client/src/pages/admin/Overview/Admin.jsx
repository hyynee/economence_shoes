import React from 'react'
import ChartContainer from '../Charts/ChartContainer'
import Container from './Header&Container/Container'

const Overview = () => {
    return (
        <div className='container w-full'>
            <Container></Container>
            <div className='flex'>
                <ChartContainer />
            </div>
        </div>
    )
}

export default Overview