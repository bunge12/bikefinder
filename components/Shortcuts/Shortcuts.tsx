import React, { useState } from 'react';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import DockIcon from '@mui/icons-material/Dock';
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group, Button } from '@mantine/core';
import QuantityInput from '../QuantityInput/QuantityInput';

const cards = [
  { title: 'Bikes', icon: PedalBikeIcon, value: 'bikes' },
  { title: 'E-bikes', icon: ElectricBikeIcon, value: 'e-bikes' },
  { title: 'Docks', icon: DockIcon, value: 'docks' },
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
    height: 100,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  selected: {
    border: `1.5px solid ${theme.colors.brandBlue[7]}`,
    boxShadow: `${theme.shadows.md} !important`,
  },
}));

type SearchQuery = {
  stations: number;
  quantity: number;
  item: string;
};
type Props = {
  searchQuery: SearchQuery;
  onSearch: (arg0: SearchQuery) => void;
};

export default function Shortcuts({ searchQuery, onSearch }: Props) {
  const { classes, theme, cx } = useStyles();
  const stations = searchQuery?.stations;
  const [quantity, setQuantity] = useState(searchQuery?.quantity);
  const [item, setItem] = useState(searchQuery?.item);

  const items = cards.map((card) => (
    <UnstyledButton
      key={card.title}
      className={cx(classes.item, { [classes.selected]: card.value === item })}
      onClick={() => setItem(card.value)}
    >
      <card.icon style={{ color: theme.colors.brandBlue[7], fontSize: 35 }} />
      <Text size="sm" mt={7}>
        {card.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card} mt="xl">
      <Group position="apart">
        <Text className={classes.title}>I&apos;m looking for...</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <Group position="center" mt="md">
        <Text>How many:</Text>
        <QuantityInput onValueChange={setQuantity} startingValue={quantity} />
        <Button color="brandGreen" onClick={() => onSearch({ stations, quantity, item })}>
          Show results
        </Button>
      </Group>
    </Card>
  );
}
