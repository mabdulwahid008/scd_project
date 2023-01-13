import React, { useEffect, useState } from 'react'
import './Services.css'
import profile from '../../images/profile.jpg'
import MessagePopup from '../messagePopup/MessagePopup'

function Services({ userData, socket }) {
    const [services, setServices] = useState([])
    const [search, setSearch] = useState('')
    const [messagePopup, setMessagePopup] = useState(false)

    const fetchServices = async()=>{
        const response = await fetch('http://localhost:5000/service',{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        const res = await response.json()
        const filter = res.filter((r)=>{return r.worker_id._id !== userData._id})
        setServices(filter)
    }

    const searchService = async( e ) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/service/tags/${search}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            },
        })
        const res = await response.json()
        const filter = res.filter((r)=>{return r.worker_id._id !== userData._id})
        setServices(filter)
    }
    useEffect(()=>{
        fetchServices()
    }, [])
  return (<>
    <div className='services'>
        <div className="search-form">
            <form onSubmit={searchService}>
                <input className='search-bar' type="text" placeholder='Search Services' onChange={(e)=>{setSearch(e.target.value)}}/> 
            </form>
                
        </div>
        
        <div className='services-section'>
            {services.length === 0 && <p>No service found with this input</p>}
        {services && <>
        {services.map((service)=>{
            return <div className='service' key={service._id}>
                    <div>
                        <img src={service.worker_id.profileIamge? 'http://localhost:5000/'+service.worker_id.profileIamge : profile} alt="profile" />
                        <div>
                            <h3>{service.worker_id.username}</h3>
                            <p>{service.location.area},<br/> {service.location.city}</p>
                        </div>
                    </div>
                    <h3>{service.title}</h3>
                    <div>
                        <button className='btn btn-submit' onClick={()=>setMessagePopup(true)}>Message</button>
                    </div>
                </div>
        })}
      </> }
        </div>
    </div>
    {messagePopup && <MessagePopup setMessagePopup={setMessagePopup} socket={socket}/>}
    </>
  )
}

export default Services