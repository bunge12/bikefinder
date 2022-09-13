import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { Autocomplete, Button, Group } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons';

const searchResults = async (query: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ca&proximity=ip&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );

  return response.json();
};

type Props = {
  onSave: (lat: number, lng: number) => void;
  onClose?: () => void;
  onRefresh?: () => void;
  hideControls?: boolean;
  onGPS?: () => void;
};

type Feature = {
  place_name: string;
  center: number[];
};

export default function Address({
  onSave,
  onClose,
  onRefresh,
  hideControls = false,
  onGPS,
}: Props) {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [selection, setSelection] = useState<any>();

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
        label="Search by Address, Point of Interest, or Postal Code"
        placeholder="Start typing to see suggestions"
        data={suggestions}
        value={value}
        onChange={setValue}
        onItemSubmit={setSelection}
        styles={{
          input: {
            fontSize: '1em',
          },
        }}
        required
      />
      <Group position={!hideControls ? 'right' : 'center'} spacing="xs" mt="sm">
        {!hideControls && (
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        )}
        <Button
          onClick={() => {
            onRefresh && onRefresh();
            onClose && onClose();
            onGPS && onGPS();
          }}
          leftIcon={<IconCurrentLocation />}
          variant="outline"
        >
          Use GPS
        </Button>
        <Button
          onClick={handleSave}
          color="brandGreen"
          variant={hideControls ? 'outline' : 'filled'}
        >
          {hideControls ? 'Use This Address' : 'Save'}
        </Button>
      </Group>
    </div>
  );
}
