import React from 'react'
import './PopupService.css'
import ReactSelect from 'react-select'
import { CiCircleRemove } from "react-icons/ci";

function PopupService({ setPopup }) {
    const onChange = (e) => {

    }
  return (
    <div className='overlay'>
        <div className='card'>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <h3>Advertise Yourself</h3>
                <CiCircleRemove id='close-btn' onClick={()=>{setPopup(false)}}/>
            </div>
            <form>
                <div>
                    <input className='input' type="text" id='title' name='title' required placeholder=' ' onChange={onChange}/>
                    <label className='label' htmlFor='title'>Tilte</label>
                </div>
                <div className='row'>
                        <div>
                            <input className='input' type="number" id='pricePerHour' name='pricePerHour' required placeholder=' ' onChange={onChange}/>
                            <label className='label' htmlFor='pricePerHour'>Price (per hour)</label>
                        </div>
                        <div className='inner-row'>
                            <div>
                                <input className='input' type="text" id='city' name='city' required placeholder=' ' onChange={onChange}/>
                                <label className='label' htmlFor='city'>City </label>
                            </div>
                            <div>
                                <input className='input' type="text" id='area' name='area' required placeholder=' ' onChange={onChange}/>
                                <label className='label' htmlFor='area'>Area </label>
                            </div>
                        </div>
                </div>
                <div>
                    <textarea className='input' name="" id="" cols="30" rows="3" placeholder=' '></textarea>
                    <label className='label' htmlFor='area'>Description </label>
                </div>
                <div>
                    <ReactSelect isMulti placeholder={<label>Select Tags</label>} styles={{control: (baseStyles, state) => ({...baseStyles,border: 'none', borderBottom: '2px solid #7278D0' , boxShadow: 'none'}),}} options={[{ value: "Spring", label: "Spring" },{ value: "Summer", label: "Summer" },{ value: "Autumn", label: "Autumn" },{ value: "Winter", label: "Winter" }]}/>
                </div>
                <button className='btn btn-advertise'>Advertise</button>
            </form>
        </div>
    </div>
  )
}

export default PopupService