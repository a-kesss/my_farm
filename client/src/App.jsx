import { Route, Routes } from 'react-router';
import Layout from './Layout';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import AddAnimalPage from './components/pages/AddAnimalPage';
import RegistrationPage from './components/pages/RegistrationPage';
import FarmPage from './components/pages/FarmPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/adduser" element={<AddAnimalPage />} />
          <Route
            path="/profile"
            element={<h1>В РАЗРАБОТКЕ, ТУТ БУДЕТ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</h1>}
          />
          <Route path="/farm/:id" element={<FarmPage />} />
          <Route path="*" element={<h1>ТАКОЙ СТРАНИЦЫ НЕ СУЩЕСТВУЕТ</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
