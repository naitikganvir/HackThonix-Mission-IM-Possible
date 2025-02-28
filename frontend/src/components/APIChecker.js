import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const APIChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const checkAPI = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/check", { url });
      setResult(res.data);
      toast.success(`API is ${res.data.status} with ${res.data.accuracy}% accuracy`);
    } catch (error) {
      toast.error("Error checking API");
    }
  };

  return (
    <div>
      <h2>Check API Security</h2>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter API URL" />
      <button onClick={checkAPI}>Check</button>
      {result && <p>{result.url} is {result.status} ({result.accuracy}%)</p>}
      <ToastContainer />
    </div>
  );
};

export default APIChecker;
