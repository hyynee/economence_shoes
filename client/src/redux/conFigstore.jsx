import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './brandReducer/brandReducer'
import cartReducer from './cartReducer/cartReducer'
import categoryReducer from './categoryReducer/categoryReducer'
import goodReducer from './goodReducer/goodReducer'
import orderReducer from './orderReducer/orderReducer'
import productsReducer from './productReducer/productsReducer'
import reviewsReducer from './reviewsReducer/reviewsReducer'
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
        categoryReducer: categoryReducer,
        brandReducer: brandReducer,
        reviewsReducer: reviewsReducer,
        statisticalReducer: statisticalReducer,
    }
})
