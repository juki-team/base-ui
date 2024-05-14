import React from 'react';
import { useJukiUI } from '../../../hooks';
import { HomeIcon, T } from '../../atoms';

export const HomeLink = () => {
  const { components: { Link } } = useJukiUI();
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />&nbsp;<T className="tt-se">home</T>
    </Link>
  );
}
