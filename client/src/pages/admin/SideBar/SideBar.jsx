import React from "react";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../../lib/navigation";
import { clearSessions } from "../../../redux/userReducer/userReducer";
import { sessionStorageUtils } from "../../../util/config";

const linkClasses = "flex items-center gap-2 font-light px-2 py-2 hover:bg-white/60 hover:border-b-2";

const SideBar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={onClose}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`w-60 flex-col bg-neutral-900 text-white p-3 h-screen fixed top-0 left-0 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-40 md:block`}
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center gap-2 px-1 py-3">
          <FcBullish fontSize={24} />
          <span className="text-neutral-100 text-lg">OpenShop</span>
        </div>

        <div className="flex-1 flex flex-col">
          {DASHBOARD_SIDEBAR_LINKS.map((link) => (
            <SideBarLink key={link.key} link={link} onClose={onClose}>
              {link.label}
            </SideBarLink>
          ))}
        </div>

        <div className="pt-2 border-t border-neutral-700">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
            <SideBarLink key={link.key} link={link}></SideBarLink>
          ))}
          <div className={`${linkClasses}`}>
            <NavLink
              className="text-xl items-center flex text-red-500"
              onClick={() => {
                sessionStorageUtils.clearAllSessions();
                dispatch(clearSessions());
                window.location.reload();
              }}
            >
              <HiOutlineLogout />
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

function SideBarLink({ link, onClose }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={link.path}
      className={`${linkClasses} ${pathname === link.path ? "text-accent" : "text-white"
        }`}
      onClick={onClose}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
