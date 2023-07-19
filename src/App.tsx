import React, { useState, useEffect } from 'react';
import './App.css';
import Cricketers from './cricketers';
import CricketersDetails from './cricketersDetails';
import getPlayers, { TPlayer } from './get-players';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  const [cricketers, setCricketers] = useState<TPlayer[]>([]);

  useEffect(() => {
    // Fetch cricketer data from the getPlayers function
    getPlayers()
      .then((data: TPlayer[]) => {
        setCricketers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<Cricketers />} />
          {cricketers.length > 0 && (
            <Route
              path="/cricketer/:cricketerId"
              element={<CricketersDetails cricketers={cricketers} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
