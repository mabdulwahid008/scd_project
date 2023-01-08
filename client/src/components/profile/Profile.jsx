import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import img from '../../images/profile.jpg'
import { BsCamera } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillTrashFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import PopupService from '../PopUpService/PopupService';
import RequestPopup from '../requestPopup/RequestPopup';

function Profile({ userData, setUserLoggedin }) {
    const [image, setImage] = useState(null)
    const [profile, setProfile] = useState(img)
    const [myService, setMyService] = useState(null)
    const [popup, setPopup] = useState(false)
    const [serviceAdded, setServiceAdded] = useState(false)
    const [request, setRequest] = useState(false)
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

    const getMyService = async() =>{
        const response = await fetch('http://localhost:5000/service/myservice',{
            method: 'GET',
            headers:{
              'Content-Type' : 'Application/json',
              'token' : localStorage.getItem('token'), 
            }
          })
          const res = await response.json()
          if(response.status === 200)
              setMyService(res)
    }

    const deleteMyService =  async() => {
        const response = await fetch('http://localhost:5000/service',{
            method: 'DELETE',
            headers:{
              'Content-Type' : 'Application/json',
              'token' : localStorage.getItem('token'), 
            }
          })
          const res = await response.json()
          if(response.status === 200){
                toast.success(res.message)
                setMyService(null)
                setServiceAdded(false)
            }
          else
            toast.error(res.message)
    }

    useEffect(() => {
        setMyService(null)
     getMyService()
    }, [serviceAdded])
    
  return (
      <>
    <div className='profile'>
        <div className='profile-body'>
            <div className='profile-cover'></div>
            <input ref={ref} type="file" accept='image/jpg image/png image/jpeg' onChange={onChange}/>
            <div className='profile-header'>
                <div>
                    <img src={userData.profileIamge? 'http://localhost:5000/'+userData.profileIamge : profile} alt="profile" />
                    <div className='profile-overlay' onClick={()=>ref.current.click()}><BsCamera/></div>
                    <div>
                        {!myService && !serviceAdded && <button className='btn btn-advertise' onClick={()=>{setPopup(true); localStorage.setItem('popup', 0) } }>Advertise</button>}
                        <button className='btn btn-submit' onClick={()=>setRequest(true)}>Request</button>
                    </div>
                </div>
                <p>{userData.username}</p>
            </div>

            {myService && <div> 
                <h5>My Advertisement</h5>
                <div className='myservice'>
                    <div className='head'>
                        <div className='service-content'>
                            <h5>Title:</h5>
                            <p>{myService.title}</p>
                        </div>
                        <div className='service-content'>
                            <h5>Price Per Hour:</h5>
                            <p>{myService.pricePerHour} Rs</p>
                        </div>
                    </div>
                    <div className='service-content'>
                            <h5>Description:</h5>
                            <p>{myService.description}</p>
                    </div>
                    <div className='service-content'>
                            <h5>Location:</h5>
                            <p>{myService.location.area}, {myService.location.city}</p>
                    </div>
                    <div className='head'>
                        <div className='service-content'>
                                <h5>Tags:</h5>
                                <span className='keywords'>{myService.keywords.map((tag)=>{
                                    return <p>{tag} </p>
                                })}</span>
                        </div>
                        <div className='actions'>
                            <FaRegEdit onClick={()=>{setPopup(true); localStorage.setItem('popup', 1)}}/>
                            <BsFillTrashFill onClick={deleteMyService}/>
                        </div>
                    </div>
                </div>
            </div>}

            <h5>My Bookings</h5>
            <div className='bookings'>
                <p>You have currently no bookings</p>
            </div>
            <button className='btn' onClick={()=>{localStorage.removeItem('token'); setUserLoggedin(false)}}>LogOut</button>        
            </div>
    </div>

    {request && <RequestPopup setRequest={setRequest}/>}
    {popup && <PopupService setPopup={setPopup} setServiceAdded={setServiceAdded} myService={myService? {title: myService.title, description: myService.description, pricePerHour: myService.pricePerHour, city: myService.location.city, area: myService.location.area, keywords: myService.keywords}: {title: '', description: '', pricePerHour: '', city: '', area: '', keywords: []}}/>}
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover theme="light" />  
    </>
  )
}

export default Profile