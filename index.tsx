import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './app/page';
import LandingPage from './components/landing-page';
import LoginScreen from './components/LoginScreen';
import ProviderHome from './app/(provider)/page';
import ProviderWallet from './app/(provider)/wallet/page';
import UserHome from './app/(user)/page';
import UserBookings from './app/(user)/bookings/page';
import UserHelp from './app/(user)/help/page';
import UserMembership from './app/(user)/membership/page';
import UserProfile from './app/(user)/profile/page';
import './styles/globals.css';

const App = () => {
  const navigate = useNavigate();

  const handleLogin = (role: 'user' | 'provider') => {
    if (role === 'user') {
      navigate('/user');
    } else {
      navigate('/provider');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
      <Route path="/register" element={<LoginScreen onLogin={handleLogin} />} />
      <Route path="/provider" element={<ProviderHome />} />
      <Route path="/provider/wallet" element={<ProviderWallet />} />
      <Route path="/user" element={<UserHome />} />
      <Route path="/user/bookings" element={<UserBookings />} />
      <Route path="/user/help" element={<UserHelp />} />
      <Route path="/user/membership" element={<UserMembership />} />
      <Route path="/user/profile" element={<UserProfile />} />
    </Routes>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
