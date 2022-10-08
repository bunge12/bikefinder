import {
  Center,
  MediaQuery,
  SegmentedControl,
  Group,
  Stack,
  Paper,
  Image,
  Badge,
} from '@mantine/core';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import Station from '../Station/Station';
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  list?: TStation[];
  query: TSearchQuery;
};

export default function Results({ list, query }: Props) {
  const [display, setDisplay] = useState<string>('list');

  const markers = list?.map((each, index) => (
    <Marker key={index} longitude={each.lon} latitude={each.lat}>
      <Badge
        size="lg"
        leftSection={<PedalBikeIcon />}
        styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
      >
        {each.num_bikes_available_types.mechanical}
      </Badge>
    </Marker>
  ));

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
          <Paper withBorder style={{ overflow: 'hidden' }}>
            <Map
              initialViewState={{
                longitude: query.lng,
                latitude: query.lat,
                zoom: 15,
              }}
              style={{ width: '100%', height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              attributionControl={false}
            >
              <Marker longitude={query.lng} latitude={query.lat}>
                <Image src="/icons/current_location.svg" width={30} />
              </Marker>
              {markers}
            </Map>
          </Paper>

          <Stack spacing="xs" justify="space-between">
            {list?.map((each, i) => (
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
