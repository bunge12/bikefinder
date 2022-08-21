import { Container, Footer, Text } from '@mantine/core';
import React from 'react';

export default function AppFooter() {
  return (
    <Footer height={50}>
      <Container>
        <Text align="center" color="dimmed" size="sm">
          Copyright &copy; {new Date().getFullYear()} BikeFinderApp
        </Text>
      </Container>
    </Footer>
  );
}
