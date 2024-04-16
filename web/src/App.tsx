import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Footer, Header } from './layout';
import BottomNavigationCustom from './common/BottomNavigationCustom/BottomNavigationCustom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNavigationCustom />
    </>
  );
}

export default App;
