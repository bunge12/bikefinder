import { Container, createStyles, Alert } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import { IconAlertCircle } from '@tabler/icons';
import { NextSeo } from 'next-seo';
import AppHeader from '../components/Header/Header';
import AppFooter from '../components/Footer/Footer';
import Shortcuts from '../components/Shortcuts/Shortcuts';
import Results from '../components/Results/Results';

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
  mapPlaceholder: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
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

export default function HomePage() {
  const { classes } = useStyles();
  const [searchQuery, setSearchQuery] = useState<TSearchQuery>({
    stations: 5,
    quantity: 1,
    item: '',
    lat: 0,
    lng: 0,
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

        {data && data.length > 0 && <Results list={data} query={searchQuery} />}
        {!data && searchQuery.lat !== 0 && searchQuery.lng !== 0 && 'Loading...'}
      </Container>
      <AppFooter />
    </>
  );
}
