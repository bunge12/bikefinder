import React from 'react';
import AppFooter from '../Footer/Footer';
import AppHeader from '../Header/Header';

type Props = {
  children: React.ReactNode;
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
