import './App.css';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

function App() {


  const [data, setData] = useState({ BPDataList: [] });
  const [loading, setLoading] = useState(true);

  const BPDataList= [
    {
      BPL: 11,
      DataID: '4e6134510e54b3d601f0ab397df0f1a9',
      DataSource: 'FromDevice',
      HP: 111,
      HR: 80,
      IsArr: 0,
      LP: 67,
      LastChangeTime: 1731866540,
      Lat: 0,
      Lon: 0,
      MDate: 1731848503,
      Note: '',
      TimeZone: '-0500',
      measurement_time: '2024-11-17 13:01:43',
      time_zone: '-05:00'
    },
    {
      BPL: 11,
      DataID: '8043b9a017e3f896a80bf2c650e784ad',
      DataSource: 'FromDevice',
      HP: 114,
      HR: 82,
      IsArr: 0,
      LP: 71,
      LastChangeTime: 1731874626,
      Lat: 0,
      Lon: 0,
      MDate: 1731856624,
      Note: '',
      TimeZone: '-0500',
      measurement_time: '2024-11-17 15:17:04',
      time_zone: '-05:00'
    }
  ];

  useEffect(() => {
    fetch('/get-blood-pressure')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data available');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Fetched data:', responseData);
        setData(responseData.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blood pressure data:', error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Measuring</h1>
          <Loading />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Blood Pressure Data</h1>
        <table>
          <thead>
            <tr>
              <th>Blood Pressure</th>
              <th>HR</th>
              <th>Measurement Time</th>
            </tr>
          </thead>
          <tbody>
            {data.BPDataList.map((item, index) => (
              <tr key={index}>
                <td>{item.HP}/{item.LP}</td>
                <td>{item.HR}</td>
                <td>{item.measurement_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
     
      </header>
    </div>
  );
}

export default App;
