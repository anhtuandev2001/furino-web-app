import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Footer, Header } from './layout';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
