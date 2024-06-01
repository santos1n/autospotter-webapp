import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const location = useLocation();

  return (
    <div className="w-full h-[10vh] bg-[#F0F0F0] fixed bottom-0 left-0 flex justify-center items-center z-50">
      <ul className="flex justify-evenly items-center w-full">
        <li>
          <Link
            to="/landing"
            className={location.pathname === "/landing" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li>
          <Link
            to="/park"
            className={location.pathname === "/search" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </li>
        <li>
          <Link
            to="/ticket/details"
            className={location.pathname === "/ticket/details" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faTicket} />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
