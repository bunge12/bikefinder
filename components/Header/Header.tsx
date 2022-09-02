import { Button, Container, createStyles, Header, Popover, Title } from '@mantine/core';
import React, { useState } from 'react';
import Address from '../Address/Address';

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

type Props = {
  onSave: (lat: number, lng: number) => void;
  onRefresh: () => void;
};

export default function AppHeader({ onSave, onRefresh }: Props) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const handleSave = (lat: number, lng: number) => {
    setOpened(false);
    onSave(lat, lng);
  };

  return (
    <Header height={60} className={classes.header}>
      <Container className={classes.container}>
        <Title order={4} color="white">
          Bike Finder
        </Title>
        <Popover
          opened={opened}
          onChange={setOpened}
          position="bottom-end"
          shadow="md"
          withArrow
          offset={9}
          styles={(theme) => ({
            dropdown: {
              width: '35%',
              [theme.fn.smallerThan('md')]: {
                width: '50%',
              },
              [theme.fn.smallerThan('sm')]: {
                width: '90%',
              },
            },
          })}
        >
          <Popover.Target>
            <Button variant="white" color="brandBlue" onClick={() => setOpened((o) => !o)}>
              Edit Location
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Address onClose={() => setOpened(false)} onSave={handleSave} onRefresh={onRefresh} />
          </Popover.Dropdown>
        </Popover>
      </Container>
    </Header>
  );
}
