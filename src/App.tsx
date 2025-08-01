import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { useAuth } from './Context/AuthProvider';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
function App() {
 const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Navbar  />

      <div className="pt-8 px-4 w-full">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home/>: <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;