import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Login from './components/Login';
import Chat from './components/Chat';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './firebase-config';
import Spinner from 'react-spinkit'

function App() {
  const [user,loading] = useAuthState(auth)

  if(loading){

    return (
      <AppLoading>
      <Spinner name="ball-spin-fade-loader"/>
      </AppLoading>
    )
  }

  if(!user){
    return (
    <div className='App'>
      <Login/>
    </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <>
        <Header />
        <AppBody>
        <SideBar userName={user.displayName}/>
        <Routes>
          <Route path='/' element={<Chat/>}/>
        </Routes>
        </AppBody>
        </>
      </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`
    display:flex;
    height:100vh;
`
const AppLoading = styled.div`

     height:100vh;
     display:flex;
     justify-content:center;
     align-items:center; 
`
