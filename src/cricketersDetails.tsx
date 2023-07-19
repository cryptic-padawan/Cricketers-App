import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CricketerCard from './cricketerCard';
import './App.css';
import { TPlayer } from './get-players';

interface CricketersDetailsProps {
  cricketers: TPlayer[];
}

const CricketersDetails: React.FC<CricketersDetailsProps> = ({ cricketers }) => {
  const { cricketerId } = useParams<{ cricketerId: string }>();
  const [cricketer, setCricketer] = useState<TPlayer | undefined>(undefined);
  const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);

  useEffect(() => {
    // Find the cricketer with the specified ID
    const selectedCricketer = cricketers.find((player) => player.id === cricketerId);
    if (selectedCricketer) {
      setCricketer(selectedCricketer);
    }
  }, [cricketers, cricketerId]);

  useEffect(() => {
    // Fetch similar players based on the cricketer's type
    if (cricketer?.type) {
      const similarPlayers = cricketers.filter(
        (player) => player.type === cricketer.type && player.name !== cricketer.name
      ).slice(0, 5);
      setSimilarPlayers(similarPlayers);
    }
  }, [cricketer, cricketers]);

  if (!cricketer) {
    return <div>Loading...</div>; // Add loading state until the cricketer data is fetched
  }

  return (
    <div className="details-container">
      <h1>Cricketer Details</h1>
      <div className="details-card">
        <h4>{cricketer.name}</h4>
        <p> <b> Description: </b> {cricketer.description}</p>
        <p> <b> Type: </b> {cricketer.type}</p>
        <p> <b> Points: </b> {cricketer.points}</p>
        <p> <b> Rank: </b> {cricketer.rank}</p>
        <p> <b> Age: </b> {cricketer.dob}</p>
      </div>
      <div className="back-link">
        <a href="/">Back to Cricketers</a>
      </div>
      {similarPlayers.length > 0 && (
        <div className="similar">
          <h2>Similar Players</h2>
          <div className="similar-card">
            {similarPlayers.map((player, index) => (
              <CricketerCard key={index} cricketer={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CricketersDetails;
