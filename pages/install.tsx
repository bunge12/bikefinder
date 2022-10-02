import {
  Container,
  List,
  Title,
  Image,
  SegmentedControl,
  Center,
  CopyButton,
  UnstyledButton,
} from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import AppFooter from '../components/Footer/Footer';
import AppHeader from '../components/Header/Header';

export default function InstallPage() {
  const [platform, setPlatform] = useState('ios');

  const os = useOs();

  useEffect(() => {
    if (os === 'android' || os === 'ios') setPlatform(os);
  }, [os]);

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
      <Container pt="md">
        <Title order={5} align="center">
          How to install BikeFinder on your device?
        </Title>
        <Center mt="md">
          <SegmentedControl
            data={[
              { label: 'iPhone', value: 'ios' },
              { label: 'Android', value: 'android' },
            ]}
            value={platform}
            onChange={setPlatform}
          />
        </Center>
        {platform === 'android' && (
          <List type="ordered" withPadding spacing="sm" pt="md">
            <List.Item>
              Open app in Chrome (
              <CopyButton value="https://bikefinder.app">
                {({ copied, copy }) => (
                  <UnstyledButton onClick={copy}>
                    {copied ? 'link copied ✅' : 'copy link'}
                  </UnstyledButton>
                )}
              </CopyButton>
              )
            </List.Item>
            <List.Item>
              Click &quot;Install/Add to Home Screen&quot; at the bottom of the page
              <Image src="/screens/android-1.png" />
            </List.Item>
            <List.Item>
              Alternatively, click on the menu icon and click &quot;Install App&quot;
              <Image src="/screens/android-2.png" />
            </List.Item>
            <List.Item>
              Confirm installation
              <Image src="/screens/android-3.png" />
            </List.Item>
            <List.Item>✅ The app will be added to your home screen</List.Item>
          </List>
        )}
        {platform === 'ios' && (
          <List type="ordered" withPadding spacing="sm" pt="md">
            <List.Item>
              Open app in Safari (
              <CopyButton value="https://bikefinder.app">
                {({ copied, copy }) => (
                  <UnstyledButton onClick={copy}>
                    {copied ? 'link copied ✅' : 'copy link'}
                  </UnstyledButton>
                )}
              </CopyButton>
              )
            </List.Item>
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
        )}
      </Container>
      <AppFooter />
    </>
  );
}
