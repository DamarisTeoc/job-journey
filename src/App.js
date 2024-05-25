import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutJobJourney from './pages/AboutJobJourney';
import AuthProvider from './auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar /> {/* Esto hará que la NavBar sea visible en todas las páginas */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/about" element={<AboutJobJourney />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;
