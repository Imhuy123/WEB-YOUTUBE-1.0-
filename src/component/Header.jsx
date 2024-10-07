import { useState, useEffect, useRef } from 'react';
import { BsCameraVideo } from "react-icons/bs";
import { FaSearch, FaRegBell } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RxAvatar } from "react-icons/rx";
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineContacts } from 'react-icons/ai'; 
import { PiVideo } from "react-icons/pi";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [googleLoginUrl, setGoogleLoginUrl] = useState(null); // State quản lý URL Google
  const drawerRef = useRef(null);

 
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

 
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false); // Tắt menu khi nhấp ngoài
    }
  };

  useEffect(() => {
    // Fetch URL đăng nhập Google khi component được render
    fetch('/api/auth/google/url', { headers: new Headers({ accept: 'application/json' }) })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong!');
      })
      .then((data) => setGoogleLoginUrl(data.url))
      .catch((error) => console.error(error));

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="flex items-center py-3 bg-white shadow-md justify-between px-4">
        {/* Logo và Menu */}
        <div className="flex items-center">
          <HiMenu className="text-5xl cursor-pointer mr-5" onClick={toggleDrawer} />
          <div className="bg-blue-200 px-4 py-2 rounded-full">
            <span className="text-white text-3xl font-bold">VAA PON</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full px-2 py-2 w-1/3 mx-4">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="outline-none flex-grow pl-2 text-sm"
          />
          <button className="bg-yellow-400 text-white rounded-full p-2 hover:bg-yellow-500 transition">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <BsCameraVideo className="text-4xl cursor-pointer" />
          <FaRegBell className="text-4xl cursor-pointer" />

          {/* Google Login */}
          {googleLoginUrl ? (
            <a href={googleLoginUrl}>
              <RxAvatar className="text-4xl cursor-pointer" />
            </a>
          ) : (
            <RxAvatar className="text-4xl cursor-pointer" />
          )}
        </div>
      </header>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 via-white">
          <div className="flex items-center">
            <HiMenu className="text-5xl cursor-pointer mr-5" onClick={toggleDrawer} />
            <div className="bg-blue-200 px-5 py-2 rounded-full">
              <span className="text-white text-3xl font-bold">VAA</span>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {/* Menu Items */}
            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <AiOutlineHome className="text-2xl mr-4" />
              <span>Trang Chủ</span>
            </li>
            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <PiVideo className="text-2xl mr-4" />
              <span>Kênh đăng kí</span>
            </li>
            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <AiOutlineContacts className="text-2xl mr-4" />
              <span>Liên Hệ</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
