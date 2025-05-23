import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function Validator() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [message, setMessage] = useState('');

  const validateJSON = (text) => {
    try {
      JSON.parse(text);
      setIsValid(true);
      setMessage('✅ Valid JSON');
    } catch (e) {
      setIsValid(false);
      setMessage(`❌ Invalid: ${e.message}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      setInput(text);
      validateJSON(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>JSON Validator</h2>
      </div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          validateJSON(e.target.value);
        }}
        placeholder="Paste your JSON here..."
      />
      <p style={{ color: isValid ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Validator />);