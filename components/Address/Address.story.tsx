import { rest } from 'msw';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Address from './Address';

export default {
  title: 'Address',
  component: Address,
  argTypes: { onSave: { action: 'clicked' } },
} as ComponentMeta<typeof Address>;

const response = {
  type: 'FeatureCollection',
  query: ['33', 'wood'],
  features: [
    {
      id: 'address.1062373519428320',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {
        accuracy: 'point',
      },
      text: 'Wood Street',
      place_name: '33 Wood Street, Toronto, Ontario M4Y 2P8, Canada',
      center: [-79.381436, 43.66235],
      geometry: {
        type: 'Point',
        coordinates: [-79.381436, 43.66235],
      },
      address: '33',
      context: [
        {
          id: 'neighborhood.4688935',
          wikidata: 'Q1089761',
          text: 'Church-Wellesley Village',
        },
        {
          id: 'postcode.1062373519428320',
          text: 'M4Y 2P8',
        },
        {
          id: 'locality.25446951',
          wikidata: 'Q2944796',
          text: 'Downtown',
        },
        {
          id: 'place.80693287',
          wikidata: 'Q172',
          text: 'Toronto',
        },
        {
          id: 'region.10598799396263190',
          short_code: 'CA-ON',
          wikidata: 'Q1904',
          text: 'Ontario',
        },
        {
          id: 'country.2057072853587150',
          wikidata: 'Q16',
          short_code: 'ca',
          text: 'Canada',
        },
      ],
    },
    {
      id: 'address.6128171745741956',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {
        accuracy: 'interpolated',
      },
      text: 'Woodstock Place',
      place_name: '33 Woodstock Place, Toronto, Ontario M4X 1T7, Canada',
      center: [-79.364483, 43.665298],
      geometry: {
        type: 'Point',
        coordinates: [-79.364483, 43.665298],
        interpolated: true,
        omitted: true,
      },
      address: '33',
      context: [
        {
          id: 'neighborhood.3238951',
          wikidata: 'Q738848',
          text: 'Cabbagetown',
        },
        {
          id: 'postcode.6128171745741956',
          text: 'M4X 1T7',
        },
        {
          id: 'locality.25446951',
          wikidata: 'Q2944796',
          text: 'Downtown',
        },
        {
          id: 'place.80693287',
          wikidata: 'Q172',
          text: 'Toronto',
        },
        {
          id: 'region.10598799396263190',
          short_code: 'CA-ON',
          wikidata: 'Q1904',
          text: 'Ontario',
        },
        {
          id: 'country.2057072853587150',
          wikidata: 'Q16',
          short_code: 'ca',
          text: 'Canada',
        },
      ],
    },
    {
      id: 'address.857395464145198',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {
        accuracy: 'interpolated',
      },
      text: 'Woodgreen Place',
      place_name: '33 Woodgreen Place, Toronto, Ontario M4M 2J2, Canada',
      center: [-79.3469, 43.659107],
      geometry: {
        type: 'Point',
        coordinates: [-79.3469, 43.659107],
        interpolated: true,
        omitted: true,
      },
      address: '33',
      context: [
        {
          id: 'neighborhood.20007975',
          text: 'Riverside-South Riverdale',
        },
        {
          id: 'postcode.857395464145198',
          text: 'M4M 2J2',
        },
        {
          id: 'locality.27150887',
          text: 'East End',
        },
        {
          id: 'place.80693287',
          wikidata: 'Q172',
          text: 'Toronto',
        },
        {
          id: 'region.10598799396263190',
          short_code: 'CA-ON',
          wikidata: 'Q1904',
          text: 'Ontario',
        },
        {
          id: 'country.2057072853587150',
          wikidata: 'Q16',
          short_code: 'ca',
          text: 'Canada',
        },
      ],
    },
    {
      id: 'address.6015145916005486',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {
        accuracy: 'rooftop',
      },
      text: 'Woodycrest Avenue',
      place_name: '33 Woodycrest Avenue, Toronto, Ontario M4J 3A8, Canada',
      center: [-79.342136, 43.681225],
      geometry: {
        type: 'Point',
        coordinates: [-79.342136, 43.681225],
      },
      address: '33',
      context: [
        {
          id: 'neighborhood.23997479',
          text: 'The Danforth',
        },
        {
          id: 'postcode.6015145916005486',
          text: 'M4J 3A8',
        },
        {
          id: 'locality.27150887',
          text: 'East End',
        },
        {
          id: 'place.80693287',
          wikidata: 'Q172',
          text: 'Toronto',
        },
        {
          id: 'region.10598799396263190',
          short_code: 'CA-ON',
          wikidata: 'Q1904',
          text: 'Ontario',
        },
        {
          id: 'country.2057072853587150',
          wikidata: 'Q16',
          short_code: 'ca',
          text: 'Canada',
        },
      ],
    },
    {
      id: 'address.5595861323655228',
      type: 'Feature',
      place_type: ['address'],
      relevance: 1,
      properties: {
        accuracy: 'rooftop',
      },
      text: 'Woodlawn Avenue East',
      place_name: '33 Woodlawn Avenue East, Toronto, Ontario M4T 1B9, Canada',
      center: [-79.390352, 43.684129],
      geometry: {
        type: 'Point',
        coordinates: [-79.390352, 43.684129],
      },
      address: '33',
      context: [
        {
          id: 'neighborhood.23391271',
          wikidata: 'Q7637596',
          text: 'Summerhill',
        },
        {
          id: 'postcode.5595861323655228',
          text: 'M4T 1B9',
        },
        {
          id: 'locality.63089191',
          wikidata: 'Q6843067',
          text: 'Midtown',
        },
        {
          id: 'place.80693287',
          wikidata: 'Q172',
          text: 'Toronto',
        },
        {
          id: 'region.10598799396263190',
          short_code: 'CA-ON',
          wikidata: 'Q1904',
          text: 'Ontario',
        },
        {
          id: 'country.2057072853587150',
          wikidata: 'Q16',
          short_code: 'ca',
          text: 'Canada',
        },
      ],
    },
  ],
  attribution:
    'NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.',
};

const Template: ComponentStory<typeof Address> = (args) => <Address {...args} />;
export const Default = Template.bind({});
Default.parameters = {
  msw: [rest.get('https://api.mapbox.com/*', (req, res, ctx) => res(ctx.json(response)))],
};
