import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
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
        </div>
      </Router>
      <Analytics /> {/* 放在 Router 外層，避免影響 layout */}
    </>
  );
};

export default App;
