import React, { useState } from "react";

async function getData() {
  const url = "/"; // Replace with the actual API endpoint
  console.log('URL:', url);
  try {
    const response = await fetch(url);
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json; // Return the fetched data
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow the error to handle it in the caller
  }
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle fetching data
  const handleFetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      const fetchedData = await getData();
      setData(fetchedData);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {data ? (
        <div>
          <h1>Heart Rate: {data.BPDataList[0].HR}</h1>
          <h2>
            Blood Pressure: {data.BPDataList[0].HP}/{data.BPDataList[0].LP}
          </h2>
        </div>
      ) : (
        !loading && <p>No data fetched yet.</p>
      )}
    </div>
  );
}

export default App;
