import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Thư viện để quản lý cookie
import { useNavigate } from 'react-router-dom';

function LoginGoogle() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Dùng để điều hướng

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    fetch(`https://huynas123.synology.me/api/auth/google/callback?${queryParams.toString()}`, {
      headers: new Headers({ accept: 'application/json' }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Chuyển response về dạng JSON
        }
        throw new Error('Something went wrong!');
      })
      .then((data) => {
        console.log('API response:', data); // Kiểm tra phản hồi API

        setLoading(false); // Tắt trạng thái loading

        if (data.token_login && data.status_code === 200) {
          // Lưu token vào cookie
          Cookies.set('token_login', data.token_login, { expires: 7 });
          console.log('Token saved to cookie:', data.token_login); // Kiểm tra xem token đã được lưu chưa

          // Điều hướng về trang Home
          navigate('/home'); // Dùng navigate để điều hướng về trang Home
        } else {
          console.error('Không tìm thấy token hoặc status code không hợp lệ');
        }
      })
      .catch((error) => {
        setLoading(false); // Tắt trạng thái loading khi có lỗi
        setError(error); // Lưu lỗi
        console.error('Error fetching Google callback:', error); // Log lỗi chi tiết
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang chờ phản hồi từ API
  }

  if (error) {
    return (
      <div>
        <p>Error:</p>
        <code>{error.toString()}</code>
      </div>
    );
  }

  return null; // Không render gì cả nếu đã điều hướng thành công
}

export default LoginGoogle;
