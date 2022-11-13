import React, { memo, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

function Login(props) {
    const [forgetPass, setForgetPass] = useState(false)
    const [loading, setLoading] = useState(false)  
    const [token, setToken] = useState('')
    const [user, setUser] = useState(false)
    const [login, setLogin] = useState({username: '', password: '', email: '', new_pass: '', cnfrm_new_pass: ''})

    const onChange = (e)=>{
        setLogin({...login, [e.target.name] : e.target.value})
    }

    const loggin = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const response = await fetch('http://localhost:5000/user/login',{
            method : 'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(login)
        });
        const res = await response.json();
        if(res.messgae)
            toast.error(res.messgae)
        if(res.token){
            localStorage.setItem('token', res.token)
            props.setUserLoggedin(true)
        }
        setLoading(false)
    }
    const verify = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const response = await fetch('http://localhost:5000/user/forget-pass',{
            method : 'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(login)
        })
        const res = await response.json();
        if(res.message)
            toast.error(res.message)
        if(res.success){
            setUser(true)
            setForgetPass(true)
            setToken(res.token)
        }
        setLoading(false)
    }
    const updatePass = async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(login.new_pass !== login.cnfrm_new_pass){
            toast.error("Password doesn't match")
            return;
        }

        const response = await fetch('http://localhost:5000/user/update-pass', {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'Application/json',
                'token' : token
            },
            body: JSON.stringify(login)
        })
        const res = await response.json();
        if(toast.success){
            toast.success(res.message);
            setUser(false)
            setForgetPass(false)
        }
        else
            toast.error(res.message)
        setLoading(false)
    }
    
    useEffect(() => {
        if(loading)
            document.getElementById('btn').disabled = true;
        else
            document.getElementById('btn').disabled = false;
    }, [loading])
    
    
  return (
      <>
    <div className='login'>
        {!forgetPass && <div>
            <h1>Login</h1>
            <form onSubmit={loggin}>
                <div>
                    <input className='input' type="text" id='username' name='username' required placeholder=' ' onChange={onChange}/>
                    <label className='label' htmlFor='username'>Username or Email</label>
                    <span className='span'></span>
                </div>
                <div>
                    <input className='input' type="password" id='password' name='password' required placeholder=' ' onChange={onChange}/>
                    <label className='label' htmlFor='password'>Password</label>
                    <span className='span'></span>
                </div>
                <p onClick={()=> setForgetPass(true)}>Forgot Pass?</p>
                <button className='btn btn-submit' id='btn'>{!loading? 'Log In': 'Loading...'}</button>
                <p className='help'>New User <span>Sign Up</span></p>
            </form>
        </div>}

        {forgetPass && !user && <div>
            <h1>Forgot Pass</h1>
            <form onSubmit={verify}>
                <div>
                    <input className='input' required type="email" id='email' name='email' placeholder=' ' onChange={onChange}/>
                    <label className='label' htmlFor="email">Username or Email</label>
                    <span className='span'></span>
                </div>
                <button className='btn btn-submit' id="btn">{!loading? 'Verify': 'Loading...'}</button>
                <p className='help'>Got Your password <span onClick={()=>setForgetPass(false)}>Log in</span></p>
            </form>
            
            </div>}

            {user && <div>
                <h1>Update Pass</h1>
                <form onSubmit={updatePass}>
                    <div>
                        <input className='input' type="password" name="new_pass" id="new_pass" required placeholder=' ' onChange={onChange}/>
                        <label className='label' htmlFor='new_pass'>New Password</label>
                        <span className='span'></span>
                    </div>
                    <div>
                        <input className='input' type="password" name="cnfrm_new_pass" id="cnfrm_new_pass" required placeholder=' ' onChange={onChange}/>
                        <label className='label' htmlFor='cnfrm_new_pass'>Confirm Password</label>
                        <span className='span'></span>
                    </div>
                    <button className='btn btn-submit' id="btn">{!loading? 'Update Pass': 'Loading...'}</button>
                </form>
                </div>}
    </div>

        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="light"
                />  
    </>
  )
}

export default memo(Login)