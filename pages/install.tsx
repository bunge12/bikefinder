import { Container, List, Title, Image } from '@mantine/core';
import { NextSeo } from 'next-seo';
import AppHeader from '../components/Header/Header';

export default function InstallPage() {
  return (
    <>
      <NextSeo
        title="Bike Finder App"
        description="Quickly locate the closest bike share stations. Modify your search to find the number of bikes, e-bikes, or docks you need!"
        openGraph={{
          url: 'http://bikefinder.app',
          title: 'Bike Finder App',
          description:
            'Quickly locate the closest bike share stations. Modify your search to find the number of bikes, e-bikes, or docks you need!',
        }}
      />
      <AppHeader />
      <Container>
        <Title order={5} align="center">
          How to install BikeFinder on your device?
        </Title>
        <List type="ordered" withPadding spacing="sm">
          <List.Item>Open https://bikefinder.app in Safari</List.Item>
          <List.Item>
            Click on &quot;Share&quot; icon
            <Image src="/screens/ios-1.PNG" />
          </List.Item>
          <List.Item>
            Select &quot;Add to Home Screen&quot;
            <Image src="/screens/ios-2.PNG" />
          </List.Item>
          <List.Item>✅ The app will be added to your home screen</List.Item>
        </List>
      </Container>
    </>
  );
}
