import React, { useEffect, useState } from 'react'
import './Services.css'
import profile from '../../images/profile.jpg'

function Services() {
    const [services, setServices] = useState([])

    const fetchServices = async()=>{
        const response = await fetch('http://localhost:5000/service',{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        const res = await response.json()
        setServices(res)
    }
    useEffect(()=>{
        fetchServices()
    }, [])
  return (
    <div className='services'>
        <div className="search-form">
            
        </div>
        
        <div className='services-section'>
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
                        <button className='btn'>View</button>
                        <button className='btn btn-submit'>Book</button>
                    </div>
                </div>
        })}
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
                        <button className='btn'>View</button>
                        <button className='btn btn-submit'>Book</button>
                    </div>
                </div>
        })}
        </div>
    </div>
  )
}

export default Services