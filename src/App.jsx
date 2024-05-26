import React from 'react';
import './App.css';
import LeafletMap from './LeafletMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travelling Salesman Problem Solver</h1>
      </header>
      <main>
        <LeafletMap />
      </main>
    </div>
  );
}

export default App;
