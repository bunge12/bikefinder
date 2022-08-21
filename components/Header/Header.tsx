import { Container, createStyles, Header } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.gradient,
  },
}));

export default function AppHeader() {
  const { classes } = useStyles();

  return (
    <Header height={50} className={classes.header}>
      <Container>Headerr</Container>
    </Header>
  );
}
