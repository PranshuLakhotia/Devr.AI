import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';


import BotIntegrationPage from './components/integration/BotIntegrationPage';
import ContributorsPage from './components/contributors/ContributorsPage';
import PullRequestsPage from './components/pages/PullRequestsPage';
import SettingsPage from './components/pages/SettingsPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import SupportPage from './components/pages/SupportPage';
import LandingPage from './components/landing/LandingPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('landing'); // Default to landing page
  const [repoData, setRepoData] = useState<any>(null); // Store fetched repo stats

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setRepoData={setRepoData} setActivePage={setActivePage} />;
      case 'dashboard':
        return <Dashboard repoData={repoData} />;
      case 'integration':
        return <BotIntegrationPage />;
      case 'contributors':
        return <ContributorsPage repoData={repoData} />;
      case 'analytics':
        return <AnalyticsPage repoData={repoData} />;
      case 'prs':
        return <PullRequestsPage repoData={repoData} />;
      case 'support':
        return <SupportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard repoData={repoData} />;

    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div className="flex">
                  <Sidebar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    activePage={activePage}
                    setActivePage={setActivePage}
                  />
                  <main
                    className={`transition-all duration-300 flex-1 ${
                      isSidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
                  >
                    <div className="p-8">
                      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
                    </div>
                  </main>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

