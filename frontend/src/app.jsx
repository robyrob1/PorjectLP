import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import CreateSpotForm from './components/CreateSpotForm';
import LandingPage from './components/LandingPage';
import UpdateSpotForm from './pages/UpdateSpotPage';
import SpotDetailsPage from './pages/SpotDetailsPage/SpotDetailsPage';
import ManageSpotsPage from './pages/ManageSpotPage';

function Layout() {
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser()).then(() => {
  //     setIsLoaded(true)
  //   });
  // }, [dispatch]);

  return (
    <>
      <Navigation  />
      {/* <Navigation isLoaded={isLoaded} /> */}

      {/* {isLoaded && <Outlet />} */}
      <Outlet />

    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailsPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      {
        path: '/reviews/current',
        element: <h1>manage reviews OPTIONAL</h1>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
