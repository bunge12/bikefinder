import {
  Text,
  Skeleton,
  Container,
  Stack,
  Button,
  createStyles,
  Modal,
  Alert,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import { NextSeo } from 'next-seo';
import Station from '../components/Station/Station';
import Search from '../components/Search/Search';
import AppHeader from '../components/Header/Header';
import AppFooter from '../components/Footer/Footer';
import Shortcuts from '../components/Shortcuts/Shortcuts';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  alert: {
    [theme.fn.largerThan('lg')]: {
      width: '25%',
    },
    [theme.fn.largerThan('md')]: {
      width: '50%',
    },
    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
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

  const handleSave = (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  };

  return (
    <>
      <NextSeo
        title="Bike Finder App"
        description="Quickly locate the closest bike share stations. Modify your search to find the number of bikes, e-bikes, or docks you need!"
        openGraph={{
          url: 'http://bikefinder.app',
          title: 'Bike Finder App',
          description:
            'Quickly locate the closest bike share stations. Modify your search to find the number of bikes, e-bikes, or docks you need!',
        }}
      />
      <AppHeader onSave={handleSave} onRefresh={getLocation} />
      <Container>
        <Shortcuts />
        <Text size="sm" align="center" style={{ padding: '0.5rem', marginTop: '1rem' }}>
          {data && data.length > 0 && <>Showing {data.length} closest bike share stations:</>}
          {!data && <Skeleton width="75%" height="1.25rem" style={{ margin: '0px auto' }} />}
          {data && data.length === 0 && (
            <Alert
              className={classes.alert}
              icon={<IconAlertCircle size={16} />}
              title="Your search returned no results!"
              styles={{
                root: { margin: '0px auto' },
                message: { textAlign: 'left' },
              }}
            >
              Your search query returned no results. Please click &quot;Search for a station&quot;
              button below and adjust your search parameters. Hope to get you biking as soon as
              possible! 🚲
            </Alert>
          )}
        </Text>
        <Stack spacing="xs">
          {data &&
            data.length > 0 &&
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
      <AppFooter />
    </>
  );
}
