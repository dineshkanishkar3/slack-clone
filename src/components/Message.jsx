import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase-config'

function Message({message,sender,timeStamp,senderImg}) {

    const [user] = useAuthState(auth)
 
  return (
    <MessageContainer sender={sender} userName={user.displayName}>
        <MessageSenderImage src={senderImg} />
        <MessageDetails>
            <MessageInfo>
                <p>{sender}</p>
                <span>{new Date(timeStamp?.toDate()).toUTCString()}</span>
            </MessageInfo>
            <MessageBody>
                {message}
            </MessageBody>
        </MessageDetails>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
    padding: 10px;
    display:flex;
    /* justify-content: ${({sender,userName})=>sender===userName?"flex-end":"none"}; */
    flex-direction: ${({sender,userName})=>sender===userName?"row-reverse":"none"};
    >img{
        width: 45px;
        border-radius : 5px;
        margin-right:5px;
    }
`
const MessageSenderImage = styled.img``

const MessageDetails = styled.div``

const MessageInfo = styled.div`
    display:flex;
    align-items:baseline;
    font-size : 12px;
    >p{
        font-weight:bold;;
    }
    >span{
        margin : 0 5px;
        font-size:10px;
        color: slategrey;
    }
`

const MessageBody = styled.p``

