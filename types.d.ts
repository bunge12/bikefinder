type TStation = {
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

type TSearchQuery = {
  stations: number;
  quantity: number;
  item: 'bikes' | 'e-bikes' | 'docks' | '';
  lat: number;
  lng: number;
};
