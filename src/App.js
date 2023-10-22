import { Header } from './components/Header/Header';
import UserTable from './components/UserTable'
import { Home } from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration} from './pages/Registration'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { fechAuthMe,selectIsAuth } from './redux/slices/auth';


function App() {
  const dispach = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispach(fechAuthMe());
  }, []);
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
      </Routes> 
    </div>
  );
}

export default App;
