
import { CiShop } from "react-icons/ci";
import { HiOutlineCog, HiOutlineShoppingCart, HiOutlineSupport, HiOutlineUsers, HiOutlineViewGrid } from "react-icons/hi";
import { RiBillLine, RiHotelFill } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'brand',
        label: 'Brand',
        path: '/admin/brand',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'category',
        label: 'Category',
        path: '/admin/category',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/admin/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'products',
        label: 'Products',
        path: '/admin/product',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <HiOutlineShoppingCart />
    },

    {
        key: 'supplier',
        label: 'Supplier',
        path: '/admin/supplier',
        icon: <RiHotelFill />
    },
    {
        key: 'goodsreceipt',
        label: 'Goodsreceipt',
        path: '/admin/goodsreceipt',
        icon: <RiBillLine />
    },
    {
        key: 'Shop',
        label: 'Shop',
        path: '/',
        icon: <CiShop />
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog></HiOutlineCog>
    },
    {
        key: 'support',
        label: 'Support',
        path: '/support',
        icon: <HiOutlineSupport></HiOutlineSupport>
    },
]
