import { Text, Skeleton, Container, Stack, createStyles, Alert } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import { IconAlertCircle } from '@tabler/icons';
import { NextSeo } from 'next-seo';
import Station from '../components/Station/Station';
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
  lat: number | null;
  lng: number | null;
};

export default function HomePage() {
  const { classes } = useStyles();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    stations: 5,
    quantity: 1,
    item: '',
    lat: null,
    lng: null,
  });

  const { data } = useSWR(
    searchQuery.lat && searchQuery.lng
      ? [
          '/api/bikeshare',
          {
            ...searchQuery,
          },
        ]
      : null,
    fetcher
  );

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
      <AppHeader />
      <Container>
        <Shortcuts onSearch={setSearchQuery} searchQuery={searchQuery} />
        <Text size="sm" align="center" style={{ padding: '0.5rem', marginTop: '1rem' }}>
          {data && data.length > 0 && <>Showing {data.length} closest bike share stations:</>}
          {!data && searchQuery.lat && searchQuery.lng && (
            <Skeleton width="75%" height="1.25rem" style={{ margin: '0px auto' }} />
          )}
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
              Your search query returned no results. Please adjust your search parameters above and
              click Show Results. Hope to get you biking as soon as possible! 🚲
            </Alert>
          )}
        </Text>
        <Stack spacing="xs">
          {data &&
            data.length > 0 &&
            data.map((station: any, i: any) => <Station key={i} station={station} />)}
          {!data && searchQuery.lat && searchQuery.lng && (
            <>
              <Station key={1} />
              <Station key={2} />
              <Station key={3} />
              <Station key={4} />
              <Station key={5} />
            </>
          )}
        </Stack>
      </Container>
      <AppFooter />
    </>
  );
}
