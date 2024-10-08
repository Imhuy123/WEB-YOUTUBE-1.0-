import { useEffect, useRef, useState } from 'react';
import { BsCameraVideo } from "react-icons/bs";
import { FaSearch, FaRegBell, FaMoon, FaSun } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RxAvatar } from "react-icons/rx";
import { AiOutlineHome, AiOutlineContacts, AiOutlineLike } from 'react-icons/ai';
import { PiVideo } from 'react-icons/pi';
import { FaRegClock } from 'react-icons/fa6';
import { BsPersonVideo2 } from 'react-icons/bs';
import { FiBookOpen } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import PropTypes from 'prop-types'; // Import PropTypes

function Header({ isDarkMode, toggleDarkMode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    // Fetch URL đăng nhập Google
    fetch('https://huynas123.synology.me/api/auth/google/url', { headers: new Headers({ accept: 'application/json' }) })
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
      <div  className='px-4 py-2'></div>
      {/* Sử dụng 'fixed' để cố định header */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col py-1 shadow-md justify-between px-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black' }`}>
        {/* Logo và Menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Hiển thị menu ở màn hình lớn */}
            <HiMenu className="text-5xl cursor-pointer mr-5 hidden md:block" onClick={toggleDrawer} />
            <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-blue-200'}`}>
              <span className="text-white text-3xl font-bold">VAA PRN</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`flex items-center border rounded-full px-2 py-2 w-full sm:w-1/3 mx-4`}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={`outline-none flex-grow pl-2 text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            />
            <button className={`rounded-full p-2 ${isDarkMode ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-yellow-400 text-white hover:bg-yellow-500'} transition`}>
              <FaSearch />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Các icon khác ẩn ở màn hình nhỏ */}
            <BsCameraVideo className="text-4xl cursor-pointer hidden md:block" />
            <FaRegBell className="text-4xl cursor-pointer hidden md:block" />

            {/* Google Login */}
            {googleLoginUrl ? (
              <a href={googleLoginUrl}>
                <RxAvatar className="text-4xl cursor-pointer" />
              </a>
            ) : (
              <RxAvatar className="text-4xl cursor-pointer" />
            )}

            {/* Toggle Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition hidden md:block"
            >
              {isDarkMode ? <FaSun className="text-yellow-500 text-2xl" /> : <FaMoon className="text-2xl text-gray-800" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Horizontal Menu) - Ẩn trên màn hình nhỏ */}
        <nav className="flex justify-center space-x-4 py-2 mt-0 hidden md:flex">
          <button className={`px-2 py-2 text-xs ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500`}>
            Tất cả
          </button>
          <button className={`px-2 py-2 text-xs  ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500`}>
            Nhạc
          </button>
          <button className={`px-2 py-2 text-xs ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500`}>
            Trực tiếp
          </button>
          <button className={`px-2 py-2 text-xs ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500`}>
            Hoạt hình
          </button>
          <button className={`px-2 py-2 text-xs ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} hover:bg-gray-500`}>
            Đã xem
          </button>
        </nav>
      </header>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 text-black transform transition-transform duration-300 z-50 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-4">
          <div className="flex items-center">
            <HiMenu className="text-5xl cursor-pointer mr-5" onClick={toggleDrawer} />
            <div className={`px-5 py-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-blue-200'}`}>
              <span className="text-white text-3xl font-bold">VAA</span>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <AiOutlineHome className="text-2xl mr-4" />
              <span   >Trang Chủ</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <PiVideo className="text-2xl mr-4" />
              <span>Kênh đăng kí</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <AiOutlineContacts className="text-2xl mr-4" />
              <span>Liên Hệ</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <FaRegClock className="text-2xl mr-4" />
              <span>Video đã xem</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <BsPersonVideo2 className="text-2xl mr-4" />
              <span>Video của tôi</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <FiBookOpen className="text-2xl mr-4" />
              <span>Phim Lậu</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <AiOutlineLike className="text-2xl mr-4" />
              <span>Video đã thích</span>
            </li>

            <li className="flex items-center py-2 border-b border-gray-300 ml-3">
              <IoSettingsOutline className="text-2xl mr-4" />
              <span>Cài đặt</span>
            </li>

            <li className="flex items-center  py-2 border-b border-gray-300 ml-3">
              <span className="font-bold">Kênh đăng kí</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Khai báo PropTypes cho các props
Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
