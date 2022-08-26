import { Badge, Card, Group, Text, Space, ActionIcon, Skeleton } from '@mantine/core';
import React from 'react';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import DockIcon from '@mui/icons-material/Dock';
import DirectionsIcon from '@mui/icons-material/Directions';

type Props = {
  station?: {
    name: string;
    distance: number;
    num_bikes_available_types: {
      mechanical: number;
      ebike: number;
    };
    num_docks_available: number;
    lat: number;
    lon: number;
  };
};

const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export default function Station({ station }: Props) {
  return (
    <Card withBorder>
      <Group>
        {station ? (
          <>
            <Text>{station.name}</Text>
            <Text size="sm">{formatDistance(station.distance)} away</Text>
          </>
        ) : (
          <Skeleton width="100%" height="2rem" style={{ marginBottom: 10 }} />
        )}
      </Group>
      <Space h="sm" />
      <Group spacing={5}>
        <Badge
          size="lg"
          leftSection={<PedalBikeIcon />}
          styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
        >
          {station && station.num_bikes_available_types.mechanical}
        </Badge>
        <Badge
          size="lg"
          leftSection={<ElectricBikeIcon />}
          styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
        >
          {station && station.num_bikes_available_types.ebike}
        </Badge>
        <Badge
          size="lg"
          leftSection={<DockIcon />}
          styles={() => ({ leftSection: { alignSelf: 'baseline' } })}
        >
          {station && station.num_docks_available}
        </Badge>
        {station && (
          <ActionIcon
            color="brandGreen"
            size="xl"
            style={{ marginLeft: 'auto' }}
            component="a"
            aria-label="Navigate to station with Google Maps"
            target="_blank"
            href={`https://www.google.ca/maps/dir//${station.lat},${station.lon}/`}
          >
            <DirectionsIcon sx={{ fontSize: 40 }} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
}
