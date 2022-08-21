import { Text, Skeleton, Container, Stack, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Station from '../components/Station/Station';

export default function HomePage() {
  const [stations, setStations] = useState([]);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState({
    stations: 5,
    quantity: 1,
    item: 'bikes',
  });

  useEffect(() => {
    setStations([]);
    // setNotification();
    lat &&
      lng &&
      fetch('/api/bikeshare', {
        method: 'POST',
        body: JSON.stringify({
          ...searchQuery,
          lat,
          lng,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setStations(res);

          if (res.status === 204) {
            // setNotification({
            //   text: 'Your search returned no results. Please modify your search and try again.',
            // });
          }
        })
        .catch(() => {
          // setNotification({
          //   color: 'red',
          //   text: 'There was an error processing your request. Please try again.',
          // });
        });
  }, [searchQuery, lat, lng]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      // setNotification({
      //   color: 'red',
      //   text: 'Geolocation is not supported by your browser',
      // });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          // setNotification({
          //   color: 'red',
          //   text: 'Unable to retrieve your location',
          // });
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
          {stations.map((station, i) => <Station key={i} station={station} />)}
          {stations.length === 0 && (
            <>
              <Station key={1} />
              <Station key={2} />
              <Station key={3} />
              <Station key={4} />
              <Station key={5} />
            </>
          )}

          <Button color="bike-share" variant="outline" uppercase>
            search for a station
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
}
