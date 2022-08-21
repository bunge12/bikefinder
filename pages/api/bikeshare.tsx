import type { NextApiRequest, NextApiResponse } from 'next';

const distance = (lat1: number, lon1: number, lat2: number, lon2: number, unit: string): number => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist *= 1.609344;
    }
    if (unit === 'N') {
      dist *= 0.8684;
    }
    return dist;
};

const findNearestStations = (
  stations: {
    station_id: string;
    lat: number;
    lon: number;
    num_bikes_available_types: {
      mechanical: number;
      ebike: number;
    };
    num_docks_available: number;
  }[],
  status: { station_id: string }[],
  filters: {
    stations: number;
    quantity: number;
    item: string;
    lat: number;
    lng: number;
  }
) => {
  const closestStations = stations
    .map((station) => {
      const stationStatus = status.find(
        (statusStation) => statusStation.station_id === station.station_id
      );
      return {
        ...station,
        ...stationStatus,
        distance: distance(filters.lat, filters.lng, station.lat, station.lon, 'K'),
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .filter((station) => {
      if (filters.item === 'bikes') {
        return station.num_bikes_available_types.mechanical > filters.quantity;
      } if (filters.item === 'e-bikes') {
        return station.num_bikes_available_types.ebike > filters.quantity;
      } if (filters.item === 'docks') {
        return station.num_docks_available > filters.quantity;
      } return station;
    })
    .slice(0, filters.stations);

  return closestStations;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body) throw new Error('no request body found');

    const status = (
      await fetch('https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status').then(
        (statusResponse) => statusResponse.json()
      )
    ).data.stations;
    const { stations } = (
      await fetch('https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information').then(
        (stationResponse) => stationResponse.json()
      )
    ).data;

    const result = findNearestStations(stations, status, req.body);
    if (result.length === 0) {
      res.status(204);
    }

    if (result.length > 0) {
      res.status(200).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
