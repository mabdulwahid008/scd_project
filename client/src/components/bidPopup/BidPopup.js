import React, { useState } from 'react'
import './BidPopup.css'
import { CiCircleRemove } from "react-icons/ci";
import profile from '../../images/profile.jpg'
import { toast } from 'react-toastify'

function BidPopup({ setBidPopup, userData }) {
    const title = localStorage.getItem('requestTitle')
    const desc = localStorage.getItem('requestDesc')
    const req_id = localStorage.getItem("requestID")

    const [requestMsg, setRequestMsg] = useState({bid: '', req_id: req_id, worker_id: userData._id})

    const onChange = ( e ) => {
        setRequestMsg({...requestMsg, [e.target.name]: e.target.value})
    }

    const onSubmit = async( e ) => {
        e.preventDefault()

        console.log(requestMsg);
        const response = await fetch('http://localhost:5000/request',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(requestMsg)
        })

        const res = await response.json();
        if(response.status === 200)
            toast.success(res.message)
        else
            toast.error(res.message) 
        
    }
  return (
    <div className='overlay'>
        <div className='card'>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems: 'center', gap: 10}}>
                    <img src={profile} style={{width: 50, height: 50}} />
                    <div>
                        <h3>{title}</h3>
                        <p>{desc.substr(0, 30)}...</p>
                    </div>
                </div>
                <CiCircleRemove id='close-btn' onClick={()=>{setBidPopup(false)}}/>
            </div>
            <form onSubmit={onSubmit}>
                <div style={{position: 'relative'}}>
                    <textarea required className='input' placeholder=' ' name="bid" id="" cols="30" rows="5" onChange={onChange}></textarea>
                    <label className='label'>Describe how you help them</label>
                </div>
                <button className='btn btn-advertise'>Place Bid </button>
            </form>
        </div>
    </div>
  )
}

export default BidPopup