import {
  Center,
  Group,
  MediaQuery,
  SegmentedControl,
  Stack,
  Paper,
  Image,
  Badge,
  ActionIcon,
  Skeleton,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
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

const returnNumber = (type: TSearchQuery['item'], station: TStation): number => {
  if (type === 'bikes') return station.num_bikes_available_types.mechanical;
  if (type === 'e-bikes') return station.num_bikes_available_types.ebike;
  return station.num_docks_available;
};

const calculateBounds = (
  stations: TStation[],
  query: TSearchQuery
): [number, number, number, number] => {
  const listOfLng = stations.map((each) => each.lon).concat(query.lng);
  const listOfLat = stations.map((each) => each.lat).concat(query.lat);
  return [
    Math.max(...listOfLng) - 0.0005,
    Math.max(...listOfLat) + 0.0005,
    Math.min(...listOfLng) + 0.0005,
    Math.min(...listOfLat) - 0.0005,
  ];
};

type Props = {
  list?: TStation[];
  query?: TSearchQuery;
  loading?: boolean;
};

export default function Results({ list, query, loading = false }: Props) {
  const [display, setDisplay] = useState<string>('stations');
  const [popup, setPopup] = useState<TStation | null>();
  const { width } = useViewportSize();

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
        variant="filled"
        leftSection={query && returnIcon(query.item)}
        styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
      >
        {query && returnNumber(query.item, each)}
      </Badge>
    </Marker>
  ));

  const map = (
    <Paper withBorder={list && list.length > 0} style={{ overflow: 'hidden' }}>
      {loading ? (
        <Skeleton height={500} />
      ) : (
        <>
          {list && query && list.length > 0 && (
            <Map
              reuseMaps
              initialViewState={{
                longitude: query?.lng,
                latitude: query?.lat,
                zoom: 15,
                bounds: calculateBounds(list, query),
              }}
              style={{ width: '100%', height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              attributionControl={false}
            >
              <Marker longitude={query?.lng} latitude={query?.lat}>
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
          )}
        </>
      )}
    </Paper>
  );
  const stations = (
    <Stack spacing="xs" justify="space-between">
      {loading
        ? [1, 2, 3, 4, 5].map((each) => <Station key={each} />)
        : list?.map((each, i) => <Station key={i} station={each} />)}
    </Stack>
  );

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
              { label: 'List View', value: 'stations' },
              { label: 'Map View', value: 'map' },
            ]}
          />
        </Center>
      </MediaQuery>
      <Group position="center" grow>
        {width > 800 && map}
        {width > 800 && stations}
        {width < 800 && display === 'stations' && stations}
        {width < 800 && display === 'map' && map}
      </Group>
    </>
  );
}
