import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../login/Login.css'
import { BsArrowLeft, BsCamera } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import img from '../../images/profile.jpg';

function Signup({ setUserLoggedin }) {
    const ref = useRef()
    const [image, setImage] = useState(null)
    const [profile, setProfile] = useState(img)
    const [formState, setFormState] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({username: '', email: '', password: '', cnfrm_password: '', phone: 0,})

    const onChange = (e)=>{
        setUserData({...userData, [e.target.name] : e.target.value});
    }
    const creatUser = async(e)=>{
        e.preventDefault();
        setLoading(true);

        if(userData.password !== userData.cnfrm_password){
            toast.error('Password doesn\'t match');
            setFormState(1);
            setLoading(false);
            return;
        }
        if(userData.phone.length !== 11){
            console.log(typeof(userData.phone));
            toast.warn('Please enter valid phone number');
            setFormState(2);
            setLoading(false);
            return;
        }

        const response = await fetch('http://localhost:5000/user',{
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(userData)
        })
        const res = await response.json();
        if(res.token){
            localStorage.setItem('token', res.token);
            toast.success(res.message);
            setFormState(3);
        }
        else{
            toast.error(res.message)
            setFormState(0);
        }

        setLoading(false)
    }

    const uploadImage = async(e)=>{
        setImage(e.target.files[0])
        const base64 = await convertBase64(e.target.files[0])
        

        const fd = new FormData();
        fd.append('profileImage', image);
        const response = await fetch('http://localhost:5000/user/upload-profile',{
            method:'POST',
            headers:{
                'token': localStorage.getItem('token')
            },
            body: fd
        })
        const res = await response.json();
        if(res.success){
            toast.success(res.message)
            setProfile(base64)
        }
        else
            toast.error(res.message)
    }
    const convertBase64 = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload =()=>{
                resolve(reader.result)
            }
        })
    }
  return (
      <>
    <div className='login'>
       {formState!==3 && <div>
            {formState !== 0 && <BsArrowLeft onClick={()=>{if(formState !== 0)setFormState(formState-1)}}/>}
            <h1>Sign Up</h1>
            {formState===0 && <form onSubmit={(e)=>{e.preventDefault(); setFormState(1)}}>
                <div>
                    <input className='input' type="text" id='username' name='username' value={userData.username} placeholder=' ' required onChange={onChange}/>
                    <label className='label' htmlFor="username">Username</label>
                    <span className='span'></span>
                </div>
                <div>
                    <input className='input' type="email" id='email' name='email' placeholder=' ' value={userData.email} required onChange={onChange}/>
                    <label className='label' htmlFor="email">E-mail</label>
                    <span className='span'></span>
                </div>
                <button className='btn btn-submit'>Next</button>
                <p className='help'>Already a user? <Link to='/'><span>Login</span></Link></p>
            </form>}
            {formState===1 &&<form onSubmit={(e)=>{e.preventDefault(); setFormState(2)}}>
                <div>
                    <input className='input' type="password" id='password' name='password' placeholder=' ' value={userData.password} required onChange={onChange}/>
                    <label className='label' htmlFor="password">Password</label>
                    <span className='span'></span>
                </div>
                <div>
                    <input className='input' type="password" id='cnfrm_password' name='cnfrm_password' placeholder=' ' value={userData.cnfrm_password} required onChange={onChange}/>
                    <label className='label' htmlFor="cnfrm_password">Confirm Password</label>
                    <span className='span'></span>
                </div>
                <button className='btn btn-submit'>Next</button>
            </form>}
            {formState===2 && <form onSubmit={creatUser}>
                <div>
                    <input className='input' type="number" id='phone' name='phone' placeholder=' ' value={userData.phone} required onChange={onChange}/>
                    <label className='label' htmlFor="phone">Phone</label>
                    <span className='span'></span>
                </div>
                <button className='btn btn-submit'>{loading? 'Loading...' : 'Sign Up'}</button>
            </form>}
        </div>}
        {formState===3 && <div className='profileImage'>
            <h1>Upload Profile</h1>
            <input ref={ref} type="file" accept='image/jpg image/png image/jpeg' onChange={uploadImage}/>
            <div>
                <img src={profile} alt="profile"/>
                <div onClick={()=>ref.current.click()}><BsCamera/></div>
            </div>
            <p className='help'>Skip & <Link to='/profile'><span onClick={()=>{setUserLoggedin(true)}}>Visit Profile </span></Link></p>
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

export default Signup