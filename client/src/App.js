import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Navabar from './components/navbar/Navabar';
import Profile from './components/profile/Profile';
import Services from './components/services/Services';
import Signup from './components/signup/Signup';

function App() {

  const [userLoggedin, setUserLoggedin] = useState(false);
  const [userData, setUserData] = useState({});


  const getUserInfo = async(token)=>{
    const response = await fetch('http://localhost:5000/user/',{
      method: 'GET',
      headers:{
        'Content-Type' : 'Application/json',
        'token' : token, 
      }
    })
    const res = await response.json()
    setUserData(res[0])
    setUserLoggedin(true)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token)
      getUserInfo(token)
  }, [userLoggedin])

  return (
    <>
      {userLoggedin && <Navabar  userData={userData}/>}
      <Routes>
        {/* <Route path='/' element={userLoggedin?  `${userData.accountType === 0 ? <Services/> : <Navigate to='/profile'/>}` : <Login setUserLoggedin={setUserLoggedin}/>}/> */}
        <Route path='/signup' element={<Signup setUserLoggedin={setUserLoggedin}/>} />
        <Route path='/' element={userLoggedin? <Services/>  : <Login setUserLoggedin={setUserLoggedin}/>}/>
        <Route path='/profile' element={userLoggedin? <Profile userData={userData} setUserLoggedin={setUserLoggedin}/> :  <Login setUserLoggedin={setUserLoggedin}/>}/>
        <Route path='/services' element={<Navigate to='/'/>}/>
      </Routes>
    </>
  );
}

export default App;
