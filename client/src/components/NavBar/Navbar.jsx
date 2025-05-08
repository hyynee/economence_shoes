import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import React from 'react';
import { FaSearch } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useNavbar from '../../customhooks/useNavbar';


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Services', href: '/service', current: false },
  { name: 'Work', href: '/work', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { location, cart, userLogin, isAdmin, searchProd, setSearchProd, handleLogout } = useNavbar();
  const renderLogin = () => {
    if (userLogin.token) {
      return (
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <NavLink to="tablecart">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </NavLink>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cart.Items.length}
            </span>
          </button>
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                <NavLink to="profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account Setting
                </NavLink>
              </MenuItem>
              {!isAdmin && (
                <MenuItem>
                  <NavLink to="my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Order
                  </NavLink>
                </MenuItem>
              )}
              <MenuItem>
                <a href=""
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}>
                  Sign out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
          {isAdmin && (
            <NavLink to="/admin" className="text-gray-900 hover:text-accent transition-all">
              <FaUserGear className="w-6 h-6" />
            </NavLink>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-8">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${isActive ? 'text-accent border-b-2 border-accent' : 'text-gray-900 font-semibold'} capitalize font-medium hover:text-accent transition-all`
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? 'text-accent border-b-2 border-accent' : 'text-gray-900 font-semibold'} capitalize font-medium hover:text-accent transition-all`
            }
          >
            Login
          </NavLink>
        </div>
      );
    }
  };


  return (
    <Disclosure as="nav" className="container">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center ">
              <input type="search" className='text-black px-1 lg:w-[300px]' onChange={(e) => setSearchProd(e.target.value)} />
              <FaSearch className='text-2xl' />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <nav className="flex gap-8">
                {navigation.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.href}
                    className={`${item.href === location.pathname ? 'text-accent border-b-2 border-accent font-semibold' : 'text-gray-900 font-semibold'} capitalize font-medium hover:text-accent transition-all`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {renderLogin()}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.href === location.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
