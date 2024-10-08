import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home'
import LoginGoogle from './component/header/LoginGoogle';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Chuyển trạng thái sáng/tối
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Router>
        <Routes>
          {/* Định nghĩa route cho HomePage */}
          <Route exact path="/" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route exact path="/home" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />

          {/* Định nghĩa route cho LoginGoogle */}
          <Route exact path="/auth/google" element={<LoginGoogle />} />
        </Routes>
      </Router>
    </div>
  );
}
