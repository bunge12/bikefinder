import { Center, MediaQuery, SegmentedControl, Group, Stack } from '@mantine/core';
import React, { useState } from 'react';
import Map from 'react-map-gl';
import Station from '../Station/Station';

type Props = {
  list?: TStation[];
};

export default function Results({ list }: Props) {
  const [display, setDisplay] = useState<string>('list');

  return (
    <>
      {/* controls only visible in mobile */}
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Center>
          <SegmentedControl
            mb="sm"
            value={display}
            onChange={setDisplay}
            data={[
              { label: 'List View', value: 'list' },
              { label: 'Map View', value: 'map' },
            ]}
          />
        </Center>
      </MediaQuery>

      {/* full-screen display */}
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Group position="center" grow>
          <Map
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14,
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            // customAttribution="bn"
            attributionControl={false}
          />

          <Stack spacing="xs" justify="space-between">
            {list?.map((each: TStation, i: number) => (
              <Station key={i} station={each} />
            ))}
          </Stack>
        </Group>
      </MediaQuery>

      {/* mobile display */}
      {display === 'list' && (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Stack spacing="xs">
            {list?.map((each: TStation, i: number) => (
              <Station key={i} station={each} />
            ))}
          </Stack>
        </MediaQuery>
      )}
      {display === 'map' && (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <div style={{ backgroundColor: 'red', height: 500 }}>map</div>
        </MediaQuery>
      )}
    </>
  );
}
