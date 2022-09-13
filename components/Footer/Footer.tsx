import { Container, Footer, Text, Group } from '@mantine/core';
import React from 'react';

export default function AppFooter() {
  return (
    <Footer height={50} mt="xl">
      <Container>
        <Group spacing="xs" position="center">
          <Text align="center" color="dimmed" size="sm" mt="xs">
            BikeFinderApp
          </Text>
          <Text align="center" color="dimmed" size="sm" mt="xs">
            &copy;
          </Text>
          <Text
            align="center"
            color="dimmed"
            size="sm"
            mt="xs"
            component="a"
            href="#mailgo"
            data-address="bfinderapp"
            data-domain="gmail.com"
          >
            Contact Us
          </Text>
        </Group>
      </Container>
    </Footer>
  );
}
