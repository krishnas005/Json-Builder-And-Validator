import React, { useState } from 'react';

function JsonViewer({ data }) {
  return (
    <div className="json-viewer">
      <RenderNode data={data} level={0} />
    </div>
  );
}

function RenderNode({ data, level }) {
const [expanded, setExpanded] = useState(true);
  if (typeof data !== 'object' || data === null) {
    return <span className="value-string">{JSON.stringify(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);

  return (
    <div className="json-node" style={{ paddingLeft: `${level * 20}px` }}>
      <span onClick={() => setExpanded(!expanded)} className="expander">
        {expanded ? '▼' : '▶'} {isArray ? '[Array]' : '{Object}'}
      </span>
      {expanded && (
        <div className="json-children">
          {entries.map(([key, value], i) => (
            <div key={i}>
              <span className="json-key">{key}: </span>
              <RenderNode data={value} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JsonViewer;
