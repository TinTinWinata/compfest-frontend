import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import Home from './pages/home-page/home-page';
import MobileSkinCancerPage from './pages/mobile-skin-cancer-page';
import SkinCancerPage from './pages/skin-cancer-page';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/skin-cancer" element={<SkinCancerPage />}></Route>
            <Route
              path="/skin-cancer/:id"
              element={<MobileSkinCancerPage />}
            ></Route>
            <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route>
          </Routes>
        </MainLayout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
