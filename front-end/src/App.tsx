import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './apps/layouts/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from './apps/Redux/configureStore';
import { fetchBasketAsync } from './apps/Redux/basketSlice';
import LoadingComponent from './apps/components/LoadingComponent';
import { fetchCurrentUser } from './apps/Redux/accountSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading) return <LoadingComponent message='Loading App...' />



  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <ToastContainer />
    </React.Fragment>
  )
}

export default App;
