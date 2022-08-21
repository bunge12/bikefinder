import { ComponentStory, ComponentMeta } from '@storybook/react';
import Station from './Station';

export default {
  title: 'Station',
  component: Station,
} as ComponentMeta<typeof Station>;

const Template: ComponentStory<typeof Station> = (args) => <Station {...args} />;

const sampleStation = {
  station_id: '7077',
  name: 'College Park South',
  physical_configuration: 'REGULAR',
  lat: 43.659777,
  lon: -79.382767,
  altitude: 0,
  address: 'College Park South',
  capacity: 19,
  is_charging_station: false,
  rental_methods: ['KEY', 'TRANSITCARD', 'CREDITCARD', 'PHONE'],
  groups: [],
  obcn: '647-643-9694',
  nearby_distance: 500,
  _ride_code_support: true,
  distance: 1.21841657038860296,
  num_bikes_available: 0,
  num_bikes_available_types: { mechanical: 5, ebike: 0 },
  num_bikes_disabled: 0,
  num_docks_available: 19,
  num_docks_disabled: 0,
  last_reported: 1658592430,
  status: 'IN_SERVICE',
  is_installed: 1,
  is_renting: 1,
  is_returning: 1,
  traffic: null,
};

export const Default = Template.bind({});
Default.args = { station: sampleStation };

export const Loading = Template.bind({});
Loading.args = {};
