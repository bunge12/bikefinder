import { Text, Skeleton, Container, Stack, Button, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { showNotification } from '@mantine/notifications';
import Layout from '../components/Layout/Layout';
import Station from '../components/Station/Station';

const useStyles = createStyles(() => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const fetcher = async (url: string, query: object) => {
  const res = await fetch(url, { method: 'POST', body: JSON.stringify(query) });
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

export default function HomePage() {
  const { classes } = useStyles();
  const [stations, setStations] = useState<any>([]);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState({
    stations: 5,
    quantity: 1,
    item: 'bikes',
  });

  const { data, error } = useSWR(
    lat && lng
      ? [
          '/api/bikeshare',
          {
            ...searchQuery,
            lat,
            lng,
          },
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setStations(data);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      showNotification({
        title: '😟 Unable to retrieve your location',
        message: 'Geolocation is not supported by your browser',
        color: 'red',
        disallowClose: true,
        autoClose: false,
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          showNotification({
            title: '😟 Unable to retrieve your location',
            message:
              'Please click "Allow Location Access" when prompted by your browser and reload the page.',
            color: 'red',
            disallowClose: true,
            autoClose: false,
          });
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Layout>
      <Container>
        <Text size="sm" align="center" style={{ padding: '0.5rem', marginTop: '1rem' }}>
          {stations.length > 0 ? (
            <>Showing {stations.length} closest bike share stations:</>
          ) : (
            <Skeleton width="75%" height="1.25rem" style={{ margin: '0px auto' }} />
          )}
        </Text>
        <Stack spacing="xs">
          {stations.map((station: any, i: any) => (
            <Station key={i} station={station} />
          ))}
          {stations.length === 0 && (
            <>
              <Station key={1} />
              <Station key={2} />
              <Station key={3} />
              <Station key={4} />
              <Station key={5} />
            </>
          )}
        </Stack>
        <div className={classes.button}>
          <Button color="brandBlue" variant="outline" uppercase mt="lg">
            search for a station
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
