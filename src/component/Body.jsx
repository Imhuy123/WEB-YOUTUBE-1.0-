import { AiOutlineHome } from 'react-icons/ai';
import { PiVideo } from 'react-icons/pi';
import { FiBookOpen } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function BODY({ isDarkMode }) {
  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      {/* Sidebar */}
      <aside
        className={`fixed sm:top-0 sm:left-0 bottom-0 sm:h-screen w-full sm:w-20 md:w-24 lg:w-32 flex flex-row sm:flex-col justify-around sm:justify-start items-center sm:items-center py-4 sm:py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        
        {/* Sidebar item: Trang Chủ */}
        <div className="flex flex-col items-center justify-center sm:items-center space-y-2 sm:space-y-2">
          <AiOutlineHome className="text-2xl lg:text-4xl" />
          <span className="text-xs lg:text-sm">Trang Chủ</span>
        </div>

        {/* Sidebar item: Kênh Đăng Kí */}
        <div className="flex flex-col items-center justify-center sm:items-center space-y-2 sm:space-y-2">
          <PiVideo className="text-2xl lg:text-4xl" />
          <span className="text-xs lg:text-sm">Kênh Đăng Kí</span>
        </div>

        {/* Sidebar item: Phim Lậu */}
        <div className="flex flex-col items-center justify-center sm:items-center space-y-2 sm:space-y-2">
          <FiBookOpen className="text-2xl lg:text-4xl" />
          <span className="text-xs lg:text-sm">Phim Lậu</span>
        </div>

        {/* Sidebar item: Trang Cá Nhân */}
        <div className="flex flex-col items-center justify-center sm:items-center space-y-2 sm:space-y-2">
          <BsPersonCircle className="text-2xl lg:text-4xl" />
          <span className="text-xs lg:text-sm">Trang Cá Nhân</span>
        </div>

        {/* Sidebar item: Cài Đặt */}
        <div className="flex flex-col items-center justify-center sm:items-center space-y-2 sm:space-y-2 ">
          <IoSettingsOutline className="text-2xl lg:text-4xl" />
          <span className="text-xs lg:text-sm">Cài Đặt</span>
        </div>
      </aside>

      {/* Grid Video */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:ml-20 md:ml-24 lg:ml-32">
        {[...Array(12)].map((_, index) => (
          <div key={index} className={`rounded-lg h-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
            <p className="text-center mt-2">Video {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Khai báo kiểu dữ liệu props bằng PropTypes
BODY.propTypes = {
  isDarkMode: PropTypes.bool.isRequired, // Khai báo isDarkMode là bắt buộc và kiểu bool
};
