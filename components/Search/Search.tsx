import { Text, createStyles, Chip, Button } from '@mantine/core';
import React, { useState } from 'react';
import QuantityInput from '../QuantityInput/QuantityInput';

const useStyles = createStyles(() => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

type Props = {
  onSearch: Function;
  searchQuery: { stations: number; quantity: number; item: string };
};

export default function Search({ onSearch, searchQuery }: Props) {
  const [stations, setStations] = useState(searchQuery?.stations);
  const [quantity, setQuantity] = useState(searchQuery?.quantity);
  const [item, setItem] = useState(searchQuery?.item);
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.row}>
        <div className={classes.textWrapper}>
          <Text>Search for</Text>
        </div>
        <QuantityInput startingValue={stations} onValueChange={setStations} />
      </div>
      <div className={classes.row}>
        <Text>closest stations with at least</Text>
      </div>
      <div className={classes.row}>
        <QuantityInput startingValue={quantity} onValueChange={setQuantity} />
        <div className={classes.textWrapper}>
          <Text>available</Text>
        </div>
      </div>
      <div className={classes.row}>
        <Chip.Group align="center" multiple={false} value={item} onChange={setItem}>
          <Chip value="bikes">bikes</Chip>
          <Chip value="e-bikes">e-bikes</Chip>
          <Chip value="docks">docks</Chip>
        </Chip.Group>
      </div>
      <div className={classes.row}>
        <Button color="brandGreen" onClick={() => onSearch({ stations, quantity, item })}>
          Search for {stations} stations with {quantity} {item}
        </Button>
      </div>
    </>
  );
}
