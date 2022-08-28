import { Button, Container, createStyles, Header, Popover, Title } from '@mantine/core';
import React from 'react';
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
}));

export default function AppHeader() {
  const { classes } = useStyles();

  const cb = (a: number, b: number) => console.log(a, b);

  return (
    <Header height={60} className={classes.header}>
      <Container className={classes.container}>
        <Title order={4} color="white">
          Bike Finder
        </Title>
        {/* <Button
          variant="default"
          className={classes.button}
          styles={{ label: { color: 'white', ':hover': { color: 'black' } } }}
        >
          Refresh
        </Button> */}
        <Popover position="bottom-end">
          <Popover.Target>
            <Button>Edit Location</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Address onSave={cb} />
          </Popover.Dropdown>
        </Popover>
      </Container>
    </Header>
  );
}
