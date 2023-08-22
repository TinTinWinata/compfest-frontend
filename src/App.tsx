import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Room } from './components/room';
import { RegisterProvider } from './contexts/register-context';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import DiabetesPage from './pages/diabetes-page';
import { default as HomePage } from './pages/home-page/home-page';
import LoginPage from './pages/login-page';
import ProfilePage from './pages/profile-page';
import MobileSkinCancerPage from './pages/skin-cancer-page/mobile-skin-cancer-page';
import SkinCancerPage from './pages/skin-cancer-page/skin-cancer-page';
function App() {
  useEffect(()=>{AOS.init()},[])
  return (
    <BrowserRouter>
      <ToastContainer />
      <UserProvider>
        <RegisterProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/skin-cancer" element={<SkinCancerPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route
                path="/skin-cancer/:id"
                element={<MobileSkinCancerPage />}
              ></Route>
              <Route path="/diabetes" element={<DiabetesPage />}></Route>
              <Route
                path="/*"
                element={<MiddlewareRoutes></MiddlewareRoutes>}
              ></Route>
              <Route
                path="/room-create/:id"
                element={<Room mode={'create'} callId={''} />}
              ></Route>
              <Route
                path="/room/:id"
                element={<Room mode={'join'} callId={''} />}
              ></Route>
            </Routes>
          </MainLayout>
        </RegisterProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
