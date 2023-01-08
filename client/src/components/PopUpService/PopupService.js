import React, { useEffect, useState } from 'react'
import './PopupService.css'
import ReactSelect from 'react-select'
import { CiCircleRemove } from "react-icons/ci";
import { toast } from 'react-toastify'

function PopupService({ setPopup, setServiceAdded, myService }) {
   const popup = localStorage.getItem('popup')
    const [service, setService] = useState(myService)
    const [defaultTags, setDefaultTags] = useState([])

    const tags = [
        {value: 'Plumber', label: 'Plumber'},
        {value: 'Electrician', label: 'Electrician'},
        {value: 'Carpanter', label: 'Carpanter'},
        {value: 'Housemaid', label: 'Housemaid'},
        {value: 'Security Gaurd', label: 'Security Gaurd'},
        {value: 'xyz ', label: 'xyz'},
    ]
    const onChange = (e) => {
        setService({...service, [e.target.name]: e.target.value})
        console.log(service);
    }
    const tagOnChange = (value) => {
        service.keywords = value
    }

    const editService = async( e ) => {
        e.preventDefault()
        console.log('edit service');
        let arr = []
        for (let i = 0; i < service.keywords.length; i++) {
            arr[i] = service.keywords[i].value
        }
        service.keywords = arr;

        const response = await fetch('http://localhost:5000/service',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(service)
        })
        const res = await response.json()

        if(response.status === 200){
            toast.success(res.message);
            setServiceAdded(true)
            setPopup(false)
        }
        else
            toast.error(res.message);
    }
    const addService = async( e ) => {
        e.preventDefault()
        let arr = []
        for (let i = 0; i < service.keywords.length; i++) {
            arr[i] = service.keywords[i].value
        }
        service.keywords = arr;

        const response = await fetch('http://localhost:5000/service',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(service)
        })
        const res = await response.json()

        if(response.status === 200){
            toast.success(res.message);
            setServiceAdded(true)
            setPopup(false)
        }
        else
            toast.error(res.message);
    }

    useEffect(()=>{
        let selectedTags = [];
        for (let i = 0; i < myService.keywords.length; i++) {
            let obj = {
                value: myService.keywords[i],
                label: myService.keywords[i],
            }
            selectedTags.push(obj)
        }
        setDefaultTags(selectedTags)
    }, [])
    useEffect(() => {
      
    }, [defaultTags])
    
  return (
    <div className='overlay'>
        <div className='card'>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <h3>{popup == 0 ? 'Advertise Yourself' : 'Edit Your Advertisement'}</h3>
                <CiCircleRemove id='close-btn' onClick={()=>{setPopup(false)}}/>
            </div>
            <form onSubmit={popup == 0 ? addService : editService}>
                <div>
                    <input className='input' defaultValue={service.title} type="text" id='title' name='title' required placeholder=' ' onChange={onChange}/>
                    <label className='label' htmlFor='title'>Tilte</label>
                </div>
                <div className='row'>
                        <div>
                            <input className='input' defaultValue={service.pricePerHour} type="number" id='pricePerHour' name='pricePerHour' required placeholder=' ' onChange={onChange}/>
                            <label className='label' htmlFor='pricePerHour'>Price (per hour)</label>
                        </div>
                        <div className='inner-row'>
                            <div>
                                <input className='input' defaultValue={service.city} type="text" id='city' name='city' required placeholder=' ' onChange={onChange}/>
                                <label className='label' htmlFor='city'>City </label>
                            </div>
                            <div>
                                <input className='input' defaultValue={service.area} type="text" id='area' name='area' required placeholder=' ' onChange={onChange}/>
                                <label className='label' htmlFor='area'>Area </label>
                            </div>
                        </div>
                </div>
                <div>
                    <textarea style={{marginTop: 5}} className='input' defaultValue={service.description} name="description" id="" cols="30" rows="3" placeholder=' ' onChange={onChange}></textarea>
                    <label className='label' htmlFor='description'>Description </label>
                </div>
                <div>
                    <ReactSelect defaultValue={defaultTags}  onChange={tagOnChange} isMulti placeholder={<label>Select Tags</label>} styles={{control: (baseStyles, state) => ({...baseStyles,border: 'none', borderBottom: '2px solid #7278D0' , boxShadow: 'none'}),}} options={tags}/>
                </div>
                <button className='btn btn-advertise'>Advertise</button>
            </form>
        </div>
    </div>
  )
}

export default PopupService