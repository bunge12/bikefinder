import { Text } from '@mantine/core';
import React from 'react';
import QuantityInput from '../QuantityInput/QuantityInput';

type Props = {
  onSearch: () => void;
  searchQuery: { stations: number; quantity: number; items: 'bikes' | 'ebikes' | 'stations' };
};

export default function Search({ onSearch, searchQuery }: Props) {
  onSearch();
  console.log(searchQuery);

  return (
    <div>
      <Text>Search for</Text>
      <QuantityInput startingValue={5} onValueChange={() => {}} />
    </div>
  );
}
