import { Text, Skeleton, Container, Stack, Button, createStyles, Modal } from '@mantine/core';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { showNotification } from '@mantine/notifications';
import Layout from '../components/Layout/Layout';
import Station from '../components/Station/Station';
import Search from '../components/Search/Search';

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

type SearchQuery = {
  stations: number;
  quantity: number;
  item: string;
};

export default function HomePage() {
  const { classes } = useStyles();
  const [openedSearch, setOpenedSearch] = useState(false);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    stations: 5,
    quantity: 1,
    item: 'bikes',
  });

  const { data } = useSWR(
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

  const handleSearch = (query: SearchQuery) => {
    setSearchQuery(query);
    setOpenedSearch(false);
  };

  return (
    <Layout>
      <Container>
        <Text size="sm" align="center" style={{ padding: '0.5rem', marginTop: '1rem' }}>
          {data && Array.isArray(data) ? (
            <>Showing {data.length} closest bike share stations:</>
          ) : (
            <Skeleton width="75%" height="1.25rem" style={{ margin: '0px auto' }} />
          )}
        </Text>
        <Stack spacing="xs">
          {data &&
            Array.isArray(data) &&
            data.map((station: any, i: any) => <Station key={i} station={station} />)}
          {!data && (
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
          <Button
            color="brandBlue"
            variant="outline"
            uppercase
            mt="lg"
            onClick={() => setOpenedSearch(true)}
          >
            search for a station
          </Button>
        </div>
        <Modal centered opened={openedSearch} onClose={() => setOpenedSearch(false)}>
          <Search onSearch={handleSearch} searchQuery={searchQuery} />
        </Modal>
      </Container>
    </Layout>
  );
}
