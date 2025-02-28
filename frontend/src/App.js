import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [apiUrl, setApiUrl] = useState('');
    const [result, setResult] = useState('');

    const checkApiSecurity = async () => {
        try {
            const response = await axios.post('http://localhost:5000/check-api', { url: apiUrl });
            setResult(response.data.message);
        } catch (error) {
            setResult('Error checking API security.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>API Security Scanner 🔒</h1>
            <input
                type="text"
                placeholder="Enter API URL"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
            />
            <button onClick={checkApiSecurity}>Check API</button>
            {result && <p>{result}</p>}
        </div>
    );
}

export default App;
