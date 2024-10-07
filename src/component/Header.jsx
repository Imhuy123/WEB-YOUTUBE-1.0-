import React, { useState, useEffect, useRef } from 'react';
import { BsCameraVideo } from "react-icons/bs";
import { FaSearch, FaRegBell } from 'react-icons/fa'; 
import { HiMenu } from 'react-icons/hi';
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'; // Biểu tượng cho Trang chủ
import { MdOutlineMiscellaneousServices } from 'react-icons/md'; // Biểu tượng cho Dịch vụ
import { AiOutlineContacts } from 'react-icons/ai'; // Biểu tượng cho Liên 
function Header() {
  // State quản lý việc hiển thị của menu ngăn kéo
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Tạo một ref để tham chiếu tới phần tử ngăn kéo
  const drawerRef = useRef(null);

  // Hàm bật/tắt drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Hàm xử lý khi click ra ngoài ngăn kéo
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false); // Tắt menu khi nhấp ngoài
    }
  };

  // useEffect để lắng nghe sự kiện click trên toàn bộ document
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="flex items-center py-3 bg-white shadow-md justify-between px-4"> 
        {/* Menu Icon */}
       

        {/* Logo */}
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
            placeholder="tìm kiếm"
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

          {/* Circular User Icon */}
          <Link to="/auth/google">
            <RxAvatar className="text-4xl cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* Drawer (làm menu) */}
      <div
        ref={drawerRef} 
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-400 transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 via-white">
        <div className="flex items-center">
        <HiMenu className="text-5xl cursor-pointer mr-5" onClick={toggleDrawer} /> 
          <div className="bg-blue-200 px-5 py-2 rounded-full">
            <span className="text-white text-3xl font-bold">VAA</span>
          </div>
        </div>
        <ul className="mt-4 space-y-2"> {/* Thêm khoảng cách giữa các phần tử */}
        {/* Trang Chủ */}
        <li className="flex items-center py-2 border-b border-gray-300">
          <AiOutlineHome className="text-2xl mr-3" />
          <span>Trang Chủ</span>
        </li>
        
        {/* Dịch Vụ */}
        <li className="flex items-center py-2 border-b border-gray-300">
          <MdOutlineMiscellaneousServices className="text-2xl mr-3" />
          <span>Dịch Vụ</span>
        </li>
        
        {/* Liên Hệ */}
        <li className="flex items-center py-2 border-b border-gray-300">
          <AiOutlineContacts className="text-2xl mr-3" />
          <span>Liên Hệ</span>
        </li>
      </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
