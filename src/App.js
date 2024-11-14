import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
function App() {
  
  const exampleData = { 
    "BPDataList": [
      {
        "HP": 120,
        "HR": 80,
        "LP": 80,
      }
    ]
  }
  const [data, setData] = useState({ HR: '', LP: '', HP: '' });

  // using exampleData for testing
  useEffect(() => {
    setData(exampleData['BPDataList'][0]);
  }, []);
  
  const [loading, setLoading] = useState(true);

  // simulating loading time to see the spinner
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);



/*
  useEffect(() => {
    setLoading(true);
    axios.get('/api/data') //put our actual api endpoint here
      .then(response => {
        setData(response.data['BPDataList'][0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
    */
if (loading) {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Measuring </h1>
        <Loading />
      </header>
    </div>
  );
}
  return (
    <div className="App">
      <header className="App-header">
        <h1> Heart Rate: {data.HR} </h1> 
        <h2> Blood Pressure: {data.HP} / {data.LP} </h2>
      </header>
    </div>
  );
}

export default App;
