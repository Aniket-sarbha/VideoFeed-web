import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useApp, actions } from "../context/AppContext";
import { FaHome, FaVideo, FaPlus, FaSearch, FaUser } from "react-icons/fa";

export default function BottomNavigation() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === "/") return "home";
    if (pathname === "/reels") return "reels";
    if (pathname === "/add") return "add";
    if (pathname === "/search") return "search";
    if (pathname === "/profile") return "profile";
    return "home";
  };

  const activeTab = getActiveTab();

  const handleLogout = () => {
    dispatch(actions.logout());
    setShowProfileMenu(false);
    router.push("/");
  };
  const navItems = [
    { id: "home", label: "Home", icon: FaHome, path: "/" },
    { id: "reels", label: "Reels", icon: FaVideo, path: "/reels" },
    { id: "add", label: "Add", icon: FaPlus, isSpecial: true, path: "/add" },
    { id: "search", label: "Search", icon: FaSearch, path: "/search" },
    {
      id: "profile",
      label: "Profile",
      icon: FaUser,
      hasMenu: true,
      path: "/profile",
    },
  ];
  const handleNavClick = (item) => {
    if (item.id === "profile") {
      if (showProfileMenu) {
        setShowProfileMenu(false);
      } else {
        setShowProfileMenu(true);
        // Also navigate to profile page
        router.push("/profile");
      }
    } else if (item.path) {
      router.push(item.path);
      setShowProfileMenu(false);
    } else {
      // Handle other actions if needed
      setShowProfileMenu(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40 ">
      {/* Profile Menu */}
      <div className="flex justify-around items-center py-1 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors relative ${
              item.isSpecial
                ? "bg-white text-black"
                : activeTab === item.id ||
                  (item.id === "profile" && showProfileMenu)
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            <item.icon
              className={`w-6 h-6 ${item.isSpecial ? "text-black" : ""}`}
            />
            <span className="text-xs mt-1 font-medium">{item.label}</span>

            {item.hasMenu && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>{" "}
    </div>
  );
}
