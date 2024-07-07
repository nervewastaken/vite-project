import React from "react";

const Navbar = () => {
  const Mname = localStorage.getItem("name");

  if (!Mname) {
    return (
      <div className="h-20 bg-black text-blue-400">
        <div className="text-xl px-10 py-4">Login to View page</div>
      </div>
    );
  }

  return (
    <div className="h-20 bg-black text-blue-400">
      <div className="text-xl px-10 py-4">Welcome {Mname}</div>
    </div>
  );
};

export default Navbar;
