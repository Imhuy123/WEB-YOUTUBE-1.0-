import { useState } from 'react';
import Header from './component/Header';
import Body from './component/Body';
import Footer from './component/Footer';
import LoginGoogle from './component/header/LoginGoogle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Chuyển trạng thái sáng/tối
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Router>
        {/* Truyền state và hàm toggleDarkMode xuống các component */}
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route exact path="/" element={<Body isDarkMode={isDarkMode} />} />
          <Route exact path="/auth/google" element={<LoginGoogle />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}
