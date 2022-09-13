import React from 'react';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import DockIcon from '@mui/icons-material/Dock';
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group } from '@mantine/core';

const cards = [
  { title: 'Bikes', icon: PedalBikeIcon },
  { title: 'E-bikes', icon: ElectricBikeIcon },
  { title: 'Docks', icon: DockIcon },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

export default function Shortcuts() {
  const { classes, theme } = useStyles();

  const items = cards.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon style={{ color: theme.colors.brandBlue[7] }} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>I&apos;m looking for...</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <Text size="xs" mt="md">
        We will show you 5 stations with at least 1 bike. Need more results? Click Search to adjust
        your query.
      </Text>
    </Card>
  );
}
