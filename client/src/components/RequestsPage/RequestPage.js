import React, { useEffect, useState } from 'react'
import './RequestPage.css'
import profile from '../../images/profile.jpg'
import BidPopup from '../bidPopup/BidPopup'

function RequestPage() {
    const [requests, setRequests] = useState(null)
    const [bidPopup, setBidPopup] = useState(false)
    

    const getRequests = async() => {
        const response = await fetch('http://localhost:5000/request',{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                token: localStorage.getItem('token')
            },
        })
        const res = await response.json()

        if(response.status === 200)
            setRequests(res)
        else
            console.log(res.message);
    }

    useEffect(()=>{
        getRequests()
    }, [])

  return (<>
    <div className='requestPage'>
        <h3>New Requests</h3>
        {!requests && <p>No Request Found</p>}
        {requests && <div className='requests'>
            {requests.map((req)=>{
                return (
                    <div>
                        <img src={profile} alt="" />
                        <div>
                            <h5>{req.request.title}</h5>
                            <p>{req.request.description}</p>
                        </div>
                        <div>
                            <button className='btn btn-submit' onClick={()=>{setBidPopup(true); localStorage.setItem('requestTitle', req.request.title);  localStorage.setItem('requestDesc', req.request.description);  }}>Place Bid</button>
                        </div>
                    </div>
                )
            })}
        </div>}
    </div>
    {bidPopup && <BidPopup setBidPopup={setBidPopup} />}
    </>
  )
}

export default RequestPage