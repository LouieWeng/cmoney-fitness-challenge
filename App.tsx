import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import RankingPage from './pages/RankingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-900 text-white">
          <Header />
          <main className="flex-grow pt-12 md:pt-16 lg:pt-20 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/ranking" element={<RankingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Analytics /> {/* 放在 Router 外層就不會干擾版面 */}
    </>
  );
};

export default App;
