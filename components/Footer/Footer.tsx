import { Container, Footer, Text } from '@mantine/core';
import React from 'react';

export default function AppFooter() {
  return (
    <Footer height={50} mt="lg">
      <Container>
        <Text align="center" color="dimmed" size="sm" mt="xs">
          Copyright &copy; {new Date().getFullYear()} BikeFinderApp
        </Text>
      </Container>
    </Footer>
  );
}
