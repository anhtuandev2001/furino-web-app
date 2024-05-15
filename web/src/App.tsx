import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BottomNavigationCustom from './common/BottomNavigationCustom/BottomNavigationCustom';
import { Footer, Header } from './layout';
import { commonActions } from './store/common/slice';
import { useAppDispatch } from './store/root/hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(commonActions.setScreenWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <div className='pb-20 md:pb-0'>
      <Header />
      <main className='mt-[61px]'>
        <Outlet />
      </main>
      <Footer />
      <BottomNavigationCustom />
    </div>
  );
}

export default App;
