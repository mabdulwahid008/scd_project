import React, { useState } from 'react'
import './RequestPopup.css'
import { CiCircleRemove } from "react-icons/ci";
import { toast } from 'react-toastify'

function RequestPopup({ setRequest }) {
    const [requestData, setRequestData] = useState({title: '', description: ''})
 
    const onChange = ( e ) => {
        setRequestData({...requestData, [e.target.name]: e.target.value})
    }

    
    const onSubmit = async( e ) => {
        e.preventDefault();
       
        const response = await fetch('http://localhost:5000/request',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(requestData)
        })
        const res = await response.json()

        if(response.status === 200){
            toast.success(res.message)
            setRequestData({title: '', description: ''})
            setRequest(false)
        }else
            toast.error(res.message);
        
    }
 
    return (
    <div className='overlay'>
        <div className='card'>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
                <h3>What are you looking for ?</h3>
                <CiCircleRemove id='close-btn' onClick={()=>setRequest(false)}/>
            </div>
            <form className='request' onSubmit={onSubmit}>
                <div>
                    <input className='input' type='text' name='title' id='title' placeholder=' ' required onChange={onChange}/>
                    <label htmlFor="title" className='label'>Title</label>
                </div>
                <div>
                    <textarea className='input' placeholder=' ' name="description" id="description" cols="30" rows="5" onChange={onChange}></textarea>
                    <label className='label' htmlFor="description">Description</label>
                </div>
                <button className='btn btn-submit'>Submit Request</button>
            </form>
        </div>
    </div>
  )
}

export default RequestPopup