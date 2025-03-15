import { Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';

const Auth = () => {
  return (
    <Routes>
      <Route path='/' key='authLogin' element={<Login />} />
      <Route path='/register' key='authRegister' element={<Register />} />
    </Routes>
  );
};

export default Auth;
