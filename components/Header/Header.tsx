import { Button, Container, createStyles, Header, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundImage: theme.fn.linearGradient(
      75,
      theme.colors.brandBlue[7],
      theme.colors.brandGreen[4]
    ),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    border: '2px solid #fff',
  },
  popover: {
    width: '25%',
  },
}));

export default function AppHeader() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Header height={60} className={classes.header}>
      <Container className={classes.container}>
        <Link href="/" passHref>
          <Text component="a" color="white" weight="bold" size="lg">
            BikeFinder
          </Text>
        </Link>
        {router.pathname !== '/install' && (
          <Link href="/install" passHref>
            <Button component="a" variant="light">
              Install App
            </Button>
          </Link>
        )}
      </Container>
    </Header>
  );
}
