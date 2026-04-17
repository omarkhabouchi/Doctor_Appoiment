/*import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoo from "../img/Logoo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow-md text-[#008e9b] flex justify-between">
      <div>
        <img className="w-32" src={logoo} alt="logoo" />
      </div>
      <ul className="flex space-x-6 items-center px-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"/"}>Services</Link>
        </li>
        <li>
          <Link to={"/"}>About</Link>
        </li>

        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/">Add Doctor</Link>
            </li>
            <li>
              <Link to={"/"}>Add Department</Link>
            </li>
          </>
        )}
        {user?.role === "user" && (
          <li>
            <Link to={"/"}>Add Appointment</Link>
          </li>
        )}
        {!user && (
          <>
            <li>
              <Link to="/login">Longin</Link>
            </li>
            <li>
              <Link to={"/"}>Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button onClick={logout}></button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoo from "../img/Logoo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md text-[#008e9b] flex justify-between">
      <div>
        <img className="w-32" src={logoo} alt="logoo" />
      </div>

      <ul className="flex space-x-6 items-center px-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Services</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>

        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/add-doctor">Add Doctor</Link>
            </li>
            <li>
              <Link to="/">Add Department</Link>
            </li>
          </>
        )}

        {user?.role === "user" && (
          <li>
            <Link to="/add-appointment">Addappointment</Link>
          </li>
        )}

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li className="font-semibold">
              Welcome {user.name} ({user.role})
            </li>

            <li>
              <button
                onClick={logout}
                className="bg-[#008e9b] text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
/************* 


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoo from "../img/Logoo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md text-[#008e9b] flex justify-between items-center px-6 py-2">
      
      ///{/* Logo 
      <div>
        <img className="w-28" src={logoo} alt="logo" />
      </div>

      ////{/* Menu 
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        ////{/* Admin 
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/add-doctor">Add Doctor</Link>
            </li>
            <li>
              <Link to="/add-department">Add Department</Link>
            </li>
          </>
        )}

        /////* User 
        {user?.role === "user" && (
          <li>
            <Link to="/appointment">Add Appointment</Link>
          </li>
        )}

        /////////////* Guest 
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        ///////////* Logout 
        {user && (
          <li>
            <button
              onClick={logout}
              className="bg-[#008e9b] text-white px-4 py-1 rounded hover:bg-[#00727c]"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
*/
