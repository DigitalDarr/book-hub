import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useLocation  } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  return (
    <main>
        {}
        {location.pathname === "/" && <Header/>}
        <Outlet />
    </main>
  );
};

export default Home;