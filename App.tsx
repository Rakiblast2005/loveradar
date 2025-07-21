
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import MainDashboard from './components/MainDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {isLoggedIn ? (
        <MainDashboard onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
