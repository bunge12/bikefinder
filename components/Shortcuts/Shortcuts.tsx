import React, { useState, useRef } from 'react';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import DockIcon from '@mui/icons-material/Dock';
import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  Button,
  Spoiler,
  Center,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import QuantityInput from '../QuantityInput/QuantityInput';
import Address from '../Address/Address';

const cards = [
  { title: 'Bikes', icon: PedalBikeIcon, value: 'bikes' },
  { title: 'E-bikes', icon: ElectricBikeIcon, value: 'e-bikes' },
  { title: 'Docks', icon: DockIcon, value: 'docks' },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    overflow: 'visible',
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

  address: {
    width: '50%',
    [theme.fn.smallerThan('md')]: {
      width: '75%',
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

type SearchQuery = {
  stations: number;
  quantity: number;
  item: string;
  lat: number | null;
  lng: number | null;
};
type Props = {
  searchQuery: SearchQuery;
  onSearch: Function;
};

export default function Shortcuts({ searchQuery, onSearch }: Props) {
  const { classes, theme, cx } = useStyles();
  const stations = searchQuery?.stations;
  const [quantity, setQuantity] = useState(searchQuery?.quantity);
  const [item, setItem] = useState(searchQuery?.item);
  const [lat, setLat] = useState<number | null>();
  const [lng, setLng] = useState<number | null>();
  const [searchBy, setSearchBy] = useState('gps');
  const spoilerControlRef = useRef<HTMLButtonElement>(null);
  const [warning, setWarning] = useState(false);

  const getLocation = async (): Promise<any> =>
    new Promise((resolve) => {
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
            resolve(position.coords);
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
    });

  const handeSave = (aLat: number, aLng: number) => {
    setLat(aLat);
    setLng(aLng);
    setSearchBy('address');
    spoilerControlRef.current && spoilerControlRef.current.click();
  };

  const handleGPSSwitch = () => {
    setLat(null);
    setLng(null);
    setSearchBy('gps');
    spoilerControlRef.current && spoilerControlRef.current.click();
  };

  const handleShowResults = async () => {
    if (item === '') setWarning(true);
    else {
      if (searchBy === 'gps') {
        const { latitude, longitude } = await getLocation();
        onSearch({ stations, quantity, item, lat: latitude, lng: longitude });
      }
      if (searchBy === 'address') {
        onSearch({ stations, quantity, item, lat, lng });
      }
    }
  };

  const items = cards.map((card) => (
    <UnstyledButton
      key={card.title}
      className={cx(classes.item, { [classes.selected]: card.value === item })}
      onClick={() => {
        setWarning(false);
        setItem(card.value);
      }}
    >
      <card.icon style={{ color: theme.colors.brandBlue[7], fontSize: 35 }} />
      <Text size="sm" mt={7}>
        {card.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card} mt="lg" mb="lg">
      <Group position="apart">
        <Text className={classes.title}>I&apos;m looking for...</Text>
      </Group>

      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      {warning && (
        <Text align="center" color="red" size="sm" mt="sm">
          Please select an item above in order to search
        </Text>
      )}
      <Group position="center" mt="md">
        <Text>How many:</Text>
        <QuantityInput onValueChange={setQuantity} startingValue={quantity} />
        <Button color="brandGreen" onClick={handleShowResults}>
          Show results
        </Button>
      </Group>
      <Center>
        <Spoiler
          className={classes.address}
          controlRef={spoilerControlRef}
          mt="md"
          maxHeight={0}
          showLabel={
            <Group spacing="xs" position="center">
              <Text size="sm">
                Using {searchBy === 'gps' ? 'GPS location' : 'address provided'}
              </Text>
              <IconChevronDown />
            </Group>
          }
          hideLabel={
            <Group spacing="xs" position="center" mt="md">
              <Text size="sm">Close Settings</Text>
              <IconChevronUp />
            </Group>
          }
          styles={{
            control: {
              width: '100%',
            },
          }}
        >
          <Address onSave={handeSave} onGPS={handleGPSSwitch} hideControls />
        </Spoiler>
      </Center>
    </Card>
  );
}
