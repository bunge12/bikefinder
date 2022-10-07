import React from 'react';

type Props = {
  list: Result[];
};

export default function Results({ list }: Props) {
  console.log(list);
  return <div>Results</div>;
}
