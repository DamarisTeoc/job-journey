import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
//import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import AboutPage from './pages/AboutPage';

function App() {
  return (
      <Router>
        <NavBar /> {/* Esto hará que la NavBar sea visible en todas las páginas */}
        <Routes> 
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
         
        </Routes>
      </Router>
    );
  };

export default App;
