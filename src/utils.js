export function parseNestedValue(value) {
  value = value.trim();

  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (value.includes('=') && value.includes(',')) {
    const nested = {};
    value.split(',').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k && v) nested[k.trim()] = v.trim();
    });
    return nested;
  }

  if (value.startsWith('{') || value.startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}