import React, { useEffect, useState } from 'react'
import './MessagePopup.css'
import { CiCircleRemove } from "react-icons/ci";
// import io from 'socket.io-client'

function MessagePopup({ setMessagePopup, socket }) {
    // let socket;
    const [msg, setMsg] = useState({message: ''})
    const [count, setCount] = useState(0)

  
    const onChange = (e) => {
        setMsg({...msg, [e.target.name]: e.target.value})
    }
    const onSend = ( e ) =>{
        e.preventDefault();
        socket.emit("msg", msg);

        const messageBody = document.getElementById("message-body")
        const message = document.createElement("div");
        message.style.backgroundColor= "grey"
        message.style.padding ="3px 7px"
        message.style.borderRadius = "5px"
        message.style.marginTop = "4px"
        message.style.marginRight = "4px"
        message.style.width = "50%"
        message.style.float ="right"
        message.innerHTML = msg.message;
        messageBody.appendChild(message)

        document.getElementById("message").value = ''

        setMsg({message: ''})
        setCount(count+1)
    }

    const receiveMsg = () =>{
        socket.off("receive").on("receive", (msg)=>{
        
        const messageBody = document.getElementById("message-body")
        const message = document.createElement("div");
        message.style.backgroundColor= "grey"
        message.style.padding ="3px 7px"
        message.style.borderRadius = "5px"
        message.style.marginTop = "4px"
        message.style.marginRight = "4px"
        message.style.width = "50%"
        message.style.float ="left"
        message.innerHTML = msg.message;
        messageBody.appendChild(message)
        })
    }
    useEffect(() => {
        receiveMsg();
    }, [count])
    
  return (
    <div className='overlay'>
        <div className='card card-msg'>
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <h3>Message</h3>
                <CiCircleRemove id='close-btn' onClick={()=>{setMessagePopup(false)}}/>
            </div>
            <div className='message-body' id="message-body">

            </div>
            <div className='message-field'>
                <form onSubmit={onSend}>
                    <div>
                        <input required name='message' id="message" onChange={onChange} type="text" className='input' placeholder='Enter Message'/>
                    </div>
                    <button className='btn btn-submit'>Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MessagePopup