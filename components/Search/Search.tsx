import React from 'react';

type Props = {
  onSearch: () => void;
  searchQuery: { stations: number; quantity: number; items: 'bikes' | 'ebikes' | 'stations' };
};

export default function Search({ onSearch, searchQuery }: Props) {
  onSearch();
  console.log(searchQuery);

  return <div>Search</div>;
}
