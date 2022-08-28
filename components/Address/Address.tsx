import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { Autocomplete, Button, Group } from '@mantine/core';

const searchResults = async (query: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ca&proximity=ip&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );

  return response.json();
};

type Props = {
  onSave: (lat: number, lng: number) => void;
};

type Feature = {
  place_name: string;
  center: number[];
};

export default function Address({ onSave }: Props) {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 500);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const returnResults = async () => {
      const result = await searchResults(debounced as string);
      setSuggestions(
        result.features.map((feature: Feature) => ({ ...feature, value: feature.place_name }))
      );
    };

    debounced && debounced !== '' && returnResults();
  }, [debounced]);

  const handleSave = () => {
    const selection: any = suggestions.find((each: Feature) => each.place_name === value);
    selection && onSave(selection.center[1], selection.center[0]);
  };

  return (
    <div>
      {/* <form>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      {suggestions.map((each: any, i) => (
        <div key={i}>{each.place_name}</div>
      ))} */}

      <Autocomplete
        label="Enter Address"
        placeholder="Start typing to see suggestions"
        data={suggestions}
        value={value}
        onChange={setValue}
      />
      <Group position="right" spacing="xs" mt="md">
        <Button variant="outline">Close</Button>
        <Button onClick={handleSave} color="brandGreen">
          Save
        </Button>
      </Group>
    </div>
  );
}
