import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CoderTools from './pages/CoderTools';
import WriterTools from './pages/WriterTools';
import OfficeTools from './pages/OfficeTools';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="coder" element={<CoderTools />} />
            <Route path="writer" element={<WriterTools />} />
            <Route path="office" element={<OfficeTools />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
