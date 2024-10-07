import Header from './component/Header'
import Body from './component/Body'
import Footer from './component/Footer'
import LoginGoogle from './component/header/LoginGoogle'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
export default function App() {

  return (
    <div>
    


    <Router>
   
      <Routes>
       <Route exact path="/" element={<Header />} />
       <Route exact path="/auth/google" element={<LoginGoogle />} />
     
       
      </Routes>
    
      <Body />
      <Footer />
      
    </Router>
</div>
  )
}