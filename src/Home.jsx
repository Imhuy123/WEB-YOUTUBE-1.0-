import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Để lấy cookie
import Header from './component/Header';
import Body from './component/Body';
import Footer from './component/Footer';

export default function HomePage({ isDarkMode, toggleDarkMode }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Lấy token từ cookie khi trang Home được tải
    const tokenFromCookie = Cookies.get('token_login');
    
    if (tokenFromCookie) {
      setToken(tokenFromCookie); // Lưu token vào state
    } else {
      console.error('Không tìm thấy token trong cookie. Điều hướng về trang login.');
      // Nếu không tìm thấy token, bạn có thể điều hướng về trang login
     
    }
  }, []);

  return (
    <div>
      {/* Truyền state và hàm toggleDarkMode xuống các component */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Body isDarkMode={isDarkMode} />

      {/* Kiểm tra nếu có token thì hiển thị nội dung */}
      {token ? (
        <div>
          <p>Your token: {token}</p>
          {/* Bạn có thể hiển thị thêm nội dung dựa trên token nếu cần */}
        </div>
      ) : (
        <p>Loading user data...</p> // Hiển thị khi đang chờ token
      )}

      <Footer />
    </div>
  );
}
