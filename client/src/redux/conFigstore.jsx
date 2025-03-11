import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer/cartReducer'
import goodReducer from './goodReducer/goodReducer'
import orderReducer from './orderReducer/orderReducer'
import productsReducer from './productReducer/productsReducer'
import statisticalReducer from './statisticalReducer/statisticalReducer'
import supplierReducer from './supplierReducer/supplierReducer'
import userReducer from './userReducer/userReducer'

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        productsReducer: productsReducer,
        cartReducer: cartReducer,
        orderReducer: orderReducer,
        supplierReducer: supplierReducer,
        goodReducer: goodReducer,
        statisticalReducer: statisticalReducer,
    }
})
