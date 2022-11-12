import React, { useRef, useState } from 'react'
import './Profile.css'
import img from '../../images/profile.jpg'
import { BsCamera } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ userData }) {
    const [image, setImage] = useState(null)
    const [profile, setProfile] = useState(img)
    const ref = useRef();

    const onChange = async(e)=>{
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
    <div className='profile'>
        <div className='profile-body'>
            <div className='profile-cover'></div>
            <input ref={ref} type="file" accept='image/jpg image/png image/jpeg' onChange={onChange}/>
            <div className='profile-header'>
                {/* <img src={profile} alt="profile" /> */}
                <img src={'http://localhost:5000/'+userData.profile} alt="profile" />
                <div onClick={()=>ref.current.click()}><BsCamera/></div>
                <h3>{userData.username}</h3>
            </div>
        </div>
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

export default Profile