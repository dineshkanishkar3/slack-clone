import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase-config'

function Login() {
  return (
    <LoginContainer>
        <Logo src={"https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"}  />
        <h2>SignIn to Slack</h2>
        <Button onClick={loginWithGoogle}>Login with Google</Button>
    </LoginContainer>
  )

    function loginWithGoogle(e){
        e.preventDefault()
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))
    }

}

export default Login

const LoginContainer =  styled.div`
                width:300px;
                height: 450px;
                box-shadow: 0px 0px 3px rgba(0,0,0,0.6);
                margin: 180px auto;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                 border-radius:10px;
                >h2{
                        margin: 30px 0;
                }
                >.MuiButton-root{
                    background-color: green;
                    color:white;
                    font-size:12px;
                    font-weight:bold;
                    padding: 10px;
                }
                >.MuiButton-root:hover{
                     color:black;
                     box-shadow:  1px 1px 1px  green, -1px -1px 1px green;;   
                }

`

const Logo = styled.img`
        width:  160px;
        height: 90px;
        
`
