import { SimpleGrid, Stack } from '@mantine/core';
import React from 'react';
import Station from '../Station/Station';

type Props = {
  list?: TStation[];
};

export default function Results({ list }: Props) {
  return (
    <SimpleGrid cols={2}>
      <div style={{ backgroundColor: 'red' }}>map</div>
      <Stack spacing="xs">
        {list?.map((each: TStation, i: number) => (
          <Station key={i} station={each} />
        ))}
      </Stack>
    </SimpleGrid>
  );
}
