import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { selectRoomId } from '../features/appSlice';
import {useSelector} from "react-redux"
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import { auth, db } from '../firebase-config';
import Message from './Message';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendIcon from '@mui/icons-material/Send';

function Chat() {
  const [user] = useAuthState(auth)
  const chatBottomRef = useRef(null)
  const channelId = useSelector(selectRoomId)
  const [msg,setMsg] = useState("")
  const [roomInfo] = useDocument(channelId && db.collection('rooms').doc(channelId))
  const [messageRoom] = useCollection(channelId && 
      db.collection("rooms").doc(channelId).collection("messages").orderBy("timeStamp","asc"))
  

  useEffect(()=>{
    chatBottomRef?.current?.scrollIntoView()
  },[channelId,messageRoom])

  if(!channelId){
    return (
    <ChatContainer>
      <ChatEmpty>Select a Channel to start Messaging</ChatEmpty>
    </ChatContainer>
    )
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatHeaderLeft>#{roomInfo?.data().name}<StarOutlineIcon/></ChatHeaderLeft>
        <ChatHeaderRight><InfoOutlinedIcon/>Details</ChatHeaderRight>
      </ChatHeader>
      <ChatMessages>
        {messageRoom?.docs.map(doc=>{
    const {message,sender,timeStamp,senderImg} = doc.data()
    return <Message key={timeStamp} message={message} timeStamp={timeStamp} sender={sender} senderImg={senderImg}/>
  })}
      <ChatBottomPointer ref={chatBottomRef}/>
      </ChatMessages>
      
      <ChatInput >
        <input  onChange={(e)=>setMsg(e.target.value)} placeholder='Enter Message'/>
        {msg!=="" && <SendIcon onClick={sendMessage}/>}
      </ChatInput>
    </ChatContainer>
  )

  function sendMessage(e){
    if(!channelId){
      return
    }
    db.collection('rooms').doc(channelId).collection('messages').add({
      message:msg,
      sender: user.displayName,
      senderImg:user.photoURL,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMsg("")
  }



}

export default Chat

const ChatContainer = styled.div`
    flex:0.7;
    flex-grow:1;
    margin-top:70px;
    display:flex;
    flex-direction:column;
    
    
`
const ChatHeader = styled.div`
    display:flex;
    padding:10px;
    border-bottom: 1px solid lightgrey;
    box-shadow : 0 1px 3px lightgrey;
`

const ChatHeaderLeft = styled.div`
    display: flex;
    align-items:center;
    font-weight:bold;
    flex:0.5;
    text-transform : lowercase;
    >.MuiSvgIcon-root{
      margin-left:10px;
      font-size: 18px;
    }
`

const ChatHeaderRight = styled.div`
    display: flex;
    align-items:center;
    flex:0.5;
    justify-content:flex-end;
    font-size:14px;
    >.MuiSvgIcon-root{
      margin-right:5px;
      font-size: 18px;
    }
`
const ChatInput = styled.div`
    padding:5px;
    border : 1px solid black;
    display:flex;
    width:50%;
    border-radius : 50px;
    margin:auto;
    margin-bottom:20px;

    >input{
      height:24px;
      border:none;
      margin-left: 10px;
    }
    >input:focus{
      outline:none;
    }
    >.MuiSvgIcon-root{
      align-self:flex-end;
      cursor: pointer;
      margin: 0 10px 0 auto;
    }
    >.MuiSvgIcon-root:hover{
      opacity:0.5;
    }
`

const ChatMessages = styled.div`
    
    height:100%;
    overflow-y:scroll;

`

const ChatBottomPointer=styled.div`
  height:5px;
  margin-bottom:100px;
`
const ChatEmpty = styled.h2`
    text-align:center;
    margin: auto;

`