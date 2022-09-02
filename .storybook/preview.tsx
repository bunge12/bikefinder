import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from '../components/theme';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { addDecorator } from '@storybook/react';

export const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile2',
  },
};

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{ colorScheme: useDarkMode() ? 'dark' : 'light', ...theme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>{props.children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
addDecorator(mswDecorator as any);

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
