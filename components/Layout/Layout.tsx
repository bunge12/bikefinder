import React from 'react';
import AppFooter from '../Footer/Footer';
import AppHeader from '../Header/Header';

type Props = {
  children: React.ReactElement;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
