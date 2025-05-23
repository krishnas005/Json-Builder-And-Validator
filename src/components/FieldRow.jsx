export default function FieldRow({ index, field, updateField, removeField }) {
  return (
    <div className="field-row">
      <input
        placeholder="Key"
        value={field.key}
        onChange={(e) => updateField(index, { ...field, key: e.target.value })}
      />
      <input
        placeholder="Value"
        value={field.value}
        onChange={(e) => updateField(index, { ...field, value: e.target.value })}
      />
      <button onClick={() => removeField(index)}>✕</button>
    </div>
  );
}