import React, { useContext } from "react";
import { SideMenuData } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const [user, clearUSer] = useContext(UserContext);
  console.log(user)

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === "logout") {
      handleLogout();
      return;
    }

    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUSer();
    navigate("/login");
  };

  return (
    <div className="w-64 h-calc(100vh - 61px) bg-white border border-grey-200/5 rounded-lg shadow-lg flex flex-col gap-4 p-5 fixed top-[61px] left-0 z-50">
      <div className="">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <></>
        )}
        <h5 className="text-sm font-semibold">{user?.fullName || ""}</h5>
      </div>

      {SideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleNavigation(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer hover:bg-gray-200 ${
            activeMenu === item.title ? "text-white bg-primary" : ""
          }`}
        >
          <item.icon className="text-xl" />
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
