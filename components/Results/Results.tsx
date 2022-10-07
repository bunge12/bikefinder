import { Center, MediaQuery, SegmentedControl, SimpleGrid, Stack } from '@mantine/core';
import React, { useState } from 'react';
import Station from '../Station/Station';

type Props = {
  list?: TStation[];
};

export default function Results({ list }: Props) {
  const [display, setDisplay] = useState<string>('list');

  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Center>
          <SegmentedControl
            mb="sm"
            value={display}
            onChange={setDisplay}
            data={[
              { label: 'List View', value: 'list' },
              { label: 'Map View', value: 'map' },
            ]}
          />
        </Center>
      </MediaQuery>

      {/* full-screen display */}
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div style={{ backgroundColor: 'red' }}>map</div>
          <Stack spacing="xs">
            {list?.map((each: TStation, i: number) => (
              <Station key={i} station={each} />
            ))}
          </Stack>
        </SimpleGrid>
      </MediaQuery>

      {/* mobile display */}
      {display === 'list' && (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Stack spacing="xs">
            {list?.map((each: TStation, i: number) => (
              <Station key={i} station={each} />
            ))}
          </Stack>
        </MediaQuery>
      )}
      {display === 'map' && (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <div>map</div>
        </MediaQuery>
      )}
    </>
  );
}
