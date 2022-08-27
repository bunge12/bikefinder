import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

const searchResults = async (query: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ca&proximity=ip&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );

  return response.json();
};

export default function Address() {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 500);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const returnResults = async () => {
      const result = await searchResults(debounced as string);
      setSuggestions(result.features);
    };

    debounced && debounced !== '' && returnResults();
  }, [debounced]);

  return (
    <div>
      <form>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      {suggestions.map((each: any, i) => (
        <div key={i}>{each.place_name}</div>
      ))}
    </div>
  );
}
