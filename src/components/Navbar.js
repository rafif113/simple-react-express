import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const globalAuth = useSelector((state) => state.auth);
  const { username, role } = globalAuth.userData;

  return (
    <div className="flex flex-row justify-between bg-gray-700 text-white w-full h-20">
      <div className="flex flex-row items-center">
        <h1 className="mx-5 text-4xl font-bold">Shutter</h1>
        {!username ? (
          <Link to="/auth">
            <h5 className="mr-5">Authentication</h5>
          </Link>
        ) : null}
        {role === "Admin" ? (
          <Link to="/user-list">
            <h5>User Management</h5>
          </Link>
        ) : null}
      </div>
      <div className="flex items-center mx-10">
        <h5>{username ? `Welcome, ${username}` : null}</h5>
      </div>
    </div>
  );
}

export default Navbar;
