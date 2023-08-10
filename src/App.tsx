import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import DiabetesPage from './pages/diabetes-page';
import { default as HomePage } from './pages/home-page/home-page';
import LoginPage from './pages/login-page';
import MobileSkinCancerPage from './pages/mobile-skin-cancer-page';
import SkinCancerPage from './pages/skin-cancer-page';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/skin-cancer" element={<SkinCancerPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/skin-cancer/:id"
              element={<MobileSkinCancerPage />}
            ></Route>
            <Route path="/diabetes" element={<DiabetesPage />}></Route>
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
