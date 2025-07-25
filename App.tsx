import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import RankingPage from './pages/RankingPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white px-4 pt-20">
        <Header />
        <main className="flex-grow pt-12 md:pt-16 lg:pt-20 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/ranking" element={<RankingPage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics /> {/* 👈 不影響版面的追蹤元件 */}
      </div>
    </Router>
  );
};

export default App;
