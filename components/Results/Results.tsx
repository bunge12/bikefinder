import React from 'react';

type Props = {
  list: Station[];
};

export default function Results({ list }: Props) {
  console.log(list);
  return <div>Results</div>;
}
