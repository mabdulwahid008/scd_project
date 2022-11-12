import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Navabar from './components/navbar/Navabar';
import Profile from './components/profile/Profile';

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
    getUserInfo(token)
  }, [userLoggedin])

  return (
    <>
      {userLoggedin && <Navabar/>}
      <Routes>
        <Route path='/' element={userLoggedin? <div>Hello World</div> :  <Login setUserLoggedin={setUserLoggedin}/>}/>
        <Route path='/profile' element={userLoggedin? <Profile userData={userData}/> :  <Login setUserLoggedin={setUserLoggedin}/>}/>
      </Routes>
    </>
  );
}

export default App;
