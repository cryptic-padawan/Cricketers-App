import React from 'react';
import './App.css';
import { TPlayer } from './get-players';
import { Link } from 'react-router-dom';

interface CricketerCardProps {
  cricketer: TPlayer;
}

const CricketerCard: React.FC<CricketerCardProps> = ({ cricketer }) => {
  return (
    <div className="card">
      <Link to={`/cricketer/${cricketer.id}`}>
        <p className="name">{cricketer.name}</p>
      </Link>
      <div className="space">
        <p>Type: {cricketer.type}</p>
        <p>Points: {cricketer.points}</p>
        <p>Rank: {cricketer.rank}</p>
        <p>Age: {cricketer.dob}</p>
      </div>
    </div>
  );
};

export default CricketerCard;
