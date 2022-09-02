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
  onClose: () => void;
  onRefresh: () => void;
};

type Feature = {
  place_name: string;
  center: number[];
};

export default function Address({ onSave, onClose, onRefresh }: Props) {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [selection, setSelection] = useState<any>();

  onRefresh();

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
    onSave(selection.center[1], selection.center[0]);
  };

  return (
    <div>
      <Autocomplete
        label="Enter Address"
        placeholder="Start typing to see suggestions"
        data={suggestions}
        value={value}
        onChange={setValue}
        onItemSubmit={setSelection}
      />
      <Group position="right" spacing="xs" mt="md">
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
        <Button onClick={handleSave} color="brandGreen">
          Save
        </Button>
      </Group>
    </div>
  );
}
