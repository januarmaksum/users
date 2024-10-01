"use client";

import Cookies from "js-cookie";

const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-red-700 hover:bg-red-700 hover:text-white text-black rounded px-3 py-1"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
