import React from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import { enterRoom } from '../features/appSlice'
import { db } from '../firebase-config'




const SideBarOption = ({Icon,title,addChannelOpt,id})=>{
  
  const dispatch = useDispatch()

  return (
    <SideBarOptionContainer onClick={addChannelOpt ? addChannel:selectChannel}>
      {Icon && <Icon fontSize="small" style={{padding:10}} />}

      {Icon ? <h3>{title}</h3>:
              (<SideBarOptionChannel>
                <span>#</span>{title}
              </SideBarOptionChannel>)}

    </SideBarOptionContainer>
  )

  function addChannel(){
    const channelName = prompt("Enter Channel Name")
    
    if(channelName){
      db.collection("rooms").add({
       name:channelName
      })
    }
   }

   function selectChannel(){
    if(id){
      dispatch(enterRoom({
        roomId:id,
      }))
    }
}


}


export default SideBarOption

const SideBarOptionContainer = styled.div`
  display:flex;
  align-items:center;
  font-size:12px;
  padding:2px;
  cursor: pointer;
  :hover{
    opacity:0.8;
    background-color: #340e36;
  }
  >h3{
    font-weight:500;
  }
`
const SideBarOptionChannel = styled.h3`
     >span{
      padding: 15px;
     }
     padding: 10px 0;
     font-weight:300;

`