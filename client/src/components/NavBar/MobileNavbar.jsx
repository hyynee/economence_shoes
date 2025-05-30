import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";
import { useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProdActionApi, searchProductActionAPI } from "../../redux/productReducer/productsReducer";
import { clearSessions } from "../../redux/userReducer/userReducer";
import { sessionStorageUtils } from "../../util/config";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchProd, setSearchProd] = useState("");
    const dispatch = useDispatch();
    const { activeSession } = useSelector((state) => state.userReducer);
    const isAdmin = activeSession?.role_id === "1";
    const cart = useSelector((state) => state.cartReducer);

    // Xử lý tìm kiếm sản phẩm
    const handleSearch = debounce((value) => {
        if (value.trim() !== "") {
            dispatch(searchProductActionAPI(value));
        } else {
            dispatch(getAllProdActionApi());
        }
    }, 500);

    return (
        <>
            {/*  mở menu */}
            <button className="xl:hidden p-2 text-white focus:outline-none" onClick={() => setIsOpen(true)}>
                <Bars3Icon className="w-8 h-8" />
            </button>
            {/* Modal */}
            <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50" />
                <div className="fixed inset-0 flex justify-end">
                    <DialogPanel className="w-40 h-full bg-blue-500 text-white shadow-lg transform transition-all">
                        <div className="flex justify-between items-center px-4 py-4 border-b border-white">
                            <h2 className="text-xl font-semibold">Menu</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2">
                                <XMarkIcon className="w-8 h-8 border bg-black" />
                            </button>
                        </div>
                        {/* Menu Items */}
                        <nav className="flex flex-col items-center px-6 py-4 space-y-4 text-center justify-center">
                            <NavLink to="/" className="text-sm hover:text-slate-600" onClick={() => setIsOpen(false)}>
                                Home
                            </NavLink>
                            <NavLink to="/service" className="text-sm hover:text-slate-600" onClick={() => setIsOpen(false)}>
                                Services
                            </NavLink>
                            <NavLink to="/work" className="text-sm hover:text-slate-600" onClick={() => setIsOpen(false)}>
                                Work
                            </NavLink>
                        </nav>
                        {/* giỏ hàng */}
                        <div className="flex items-center justify-center px-6 py-4">
                            <NavLink to="tablecart" className="relative flex items-center text-lg" onClick={() => setIsOpen(false)}>
                                <BsFillCartCheckFill className="w-6 h-6" />
                                {cart.Items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                                        {cart.Items.length}
                                    </span>
                                )}
                            </NavLink>
                        </div>

                        {/* Tài khoản người dùng */}
                        {activeSession?.token ? (
                            <div className="flex flex-col items-center px-6 py-4 space-y-4">
                                <NavLink to="profile" className="text-sm mt-2 hover:text-slate-600" onClick={() => setIsOpen(false)}>
                                    Account Settings
                                </NavLink>
                                <NavLink to="order" className="text-sm mt-2 hover:text-slate-600" onClick={() => setIsOpen(false)}>
                                    Orders
                                </NavLink>
                                {isAdmin && (
                                    <NavLink to="/admin" className="text-gray-900 hover:text-accent transition-all p-4">
                                        <FaUserGear className="w-6 h-6" />
                                    </NavLink>
                                )}
                                <button
                                    className="text-sm text-white border-2 w-full hover:text-slate-600 bg-black p-2"
                                    onClick={() => {
                                        sessionStorageUtils.clearAllSessions();
                                        dispatch(clearSessions());
                                        window.location.reload();
                                    }}
                                >
                                    Sign out
                                </button>

                            </div>
                        ) : (
                            <div className="flex flex-col items-start px-6 py-4 space-y-4">
                                <NavLink to="register" className="text-lg" onClick={() => setIsOpen(false)}>
                                    Register
                                </NavLink>
                                <NavLink to="login" className="text-lg" onClick={() => setIsOpen(false)}>
                                    Login
                                </NavLink>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileNavbar;
