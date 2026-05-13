import { Outlet } from 'react-router-dom';
import Footer from '../app/landingPages/site-components/Footer';

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
