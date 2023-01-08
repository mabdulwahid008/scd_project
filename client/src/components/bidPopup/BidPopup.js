import React from 'react'
import './BidPopup.css'
import { CiCircleRemove } from "react-icons/ci";
import profile from '../../images/profile.jpg'

function BidPopup({ setBidPopup }) {
    const title = localStorage.getItem('requestTitle')
    const desc = localStorage.getItem('requestDesc')

    const onSubmit = async( e ) => {
        e.preventDefault()
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
                    <textarea required className='input' placeholder=' ' name="description" id="" cols="30" rows="5"></textarea>
                    <label className='label'>Describe how you help them</label>
                </div>
                <button className='btn btn-advertise'>Place Bid </button>
            </form>
        </div>
    </div>
  )
}

export default BidPopup