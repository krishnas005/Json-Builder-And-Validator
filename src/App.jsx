import React, { useState, useEffect } from 'react';
import FieldRow from './components/FieldRow';
import { parseNestedValue } from './utils';
import JsonViewer from './components/JsonViewer';

export default function App() {
  const [fields, setFields] = useState([{ key: '', value: '' }]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const updateField = (index, updatedField) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
  };

  const addField = () => setFields([...fields, { key: '', value: '' }]);

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const buildJSON = () => {
    const result = {};
    fields.forEach(({ key, value }) => {
      if (key) {
        result[key] = parseNestedValue(value);
      }
    });
    return result;
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(buildJSON(), null, 2));
    alert("Copied!");
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildJSON(), null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "data.json");
    dlAnchor.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const newFields = Object.entries(json).map(([k, v]) => ({
          key: k,
          value: typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)
        }));
        setFields(newFields);
      } catch (err) {
        alert("Invalid JSON file", err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>JSON Builder</h2>
        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀️" : "🌙"}</button>
      </div>

      <div className="note">
        ➤ Nested: <code>city=Muzaffarnagar, country=India</code><br />
        ➤ Array: <code>[val1, val2]</code><br />
        ➤ Import a file below:
      </div>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      {fields.map((field, index) => (
        <FieldRow key={index} index={index} field={field} updateField={updateField} removeField={removeField} />
      ))}

      <button onClick={addField}>+ Add Field</button>


      <JsonViewer data={buildJSON()} />

      <div className="buttons">
        <button onClick={copyJSON}>📋 Copy</button>
        <button onClick={downloadJSON}>💾 Download</button>
        <button onClick={() => window.open('/validator.html', '_blank')}>🧪 Validate</button>
      </div>
    </div>
  );
}