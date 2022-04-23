import React, { ReactNode } from 'react';
import './App.css';
import UserCard from './components/userCard';

function App() {

  let cards: Array<ReactNode> = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<UserCard key={i}></UserCard>);
  }

  return (
    <div className="content">
      {
        cards.map(card => {
          return card;
        })
      }
    </div>
  );
}

export default App;
