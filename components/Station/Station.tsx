import React from 'react';

type Props = {
  station?: {
    name: string;
  };
};

export default function Station({ station }: Props) {
  return <div>{station && station.name}</div>;
}
