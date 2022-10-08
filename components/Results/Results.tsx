import {
  Center,
  MediaQuery,
  SegmentedControl,
  Group,
  Stack,
  Paper,
  Image,
  Badge,
  ActionIcon,
} from '@mantine/core';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import DirectionsIcon from '@mui/icons-material/Directions';
import DockIcon from '@mui/icons-material/Dock';
import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Station from '../Station/Station';
import 'mapbox-gl/dist/mapbox-gl.css';

const returnIcon = (type: TSearchQuery['item']) => {
  if (type === 'bikes') return <PedalBikeIcon fontSize="small" />;
  if (type === 'e-bikes') return <ElectricBikeIcon fontSize="small" />;
  return <DockIcon fontSize="small" />;
};

const returnNumber = (type: TSearchQuery['item'], station: TStation) => {
  if (type === 'bikes') return station.num_bikes_available_types.mechanical;
  if (type === 'e-bikes') return station.num_bikes_available_types.ebike;
  return station.num_docks_available;
};

type Props = {
  list?: TStation[];
  query: TSearchQuery;
};

export default function Results({ list, query }: Props) {
  const [display, setDisplay] = useState<string>('list');
  const [popup, setPopup] = useState<TStation | null>();

  const markers = list?.map((each, index) => (
    <Marker
      key={index}
      longitude={each.lon}
      latitude={each.lat}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopup(each);
      }}
    >
      <Badge
        size="md"
        leftSection={returnIcon(query.item)}
        styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
      >
        {returnNumber(query.item, each)}
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
              {popup && (
                <Popup
                  anchor="bottom"
                  longitude={popup.lon}
                  latitude={popup.lat}
                  onClose={() => setPopup(null)}
                  offset={15}
                  closeButton={false}
                >
                  <ActionIcon
                    color="brandGreen"
                    size="md"
                    style={{ marginLeft: 'auto' }}
                    component="a"
                    aria-label="Navigate to station with Google Maps"
                    target="_blank"
                    href={`https://www.google.ca/maps/dir//${popup.lat},${popup.lon}/`}
                  >
                    <DirectionsIcon sx={{ fontSize: 25 }} />
                  </ActionIcon>
                </Popup>
              )}
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
