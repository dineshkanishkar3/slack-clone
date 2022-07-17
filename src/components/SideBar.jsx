import React from 'react'
import styled from 'styled-components'
import SideBarOption from './SideBarOption';

import {useCollection} from "react-firebase-hooks/firestore"
import { db } from '../firebase-config';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';





function SideBar({userName}){ 

    const [channels] = useCollection(db.collection('rooms'));
  
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Slack Fam</h2> 
          <h3>
            <FiberManualRecordRoundedIcon/>
            {userName}
            </h3 >
        </SideBarInfo>
        <CreateIcon/>
      </SideBarHeader>

      <SideBarOption Icon={InsertCommentIcon} title={"Threads"}/>
      <SideBarOption Icon={InboxIcon} title={"Mentions & Reactions"}/>
      <SideBarOption Icon={DraftsIcon} title={"Saved items"}/>
      <SideBarOption Icon={BookmarkBorderIcon} title={"Channel browser"}/>
      <SideBarOption Icon={PeopleAltIcon} title={"People & user groups"}/>
      <SideBarOption Icon={AppsIcon} title={"Apps"}/>
      <SideBarOption Icon={FileCopyIcon} title={"File browser"}/>
      <SideBarOption Icon={ExpandLessIcon} title={"Show less"}/>
      <hr/>
      <SideBarOption Icon={ExpandMoreIcon} title={"Channels"}/>
      <hr/>
      <SideBarOption Icon={AddIcon} title={"Add Channel"} addChannelOpt/>
      {channels?.docs.map(doc=>{
        return <SideBarOption key={doc.id} id={doc.id} title={doc.data().name}/>
      })}
      
     </SideBarContainer>
  )
}

export default SideBar

const SideBarContainer = styled.div`
    color:#fff; 
    background-color: var(--slack-color);
    flex:0.3;
    border-top: 1px solid #49274b;
    max-width:260px;
    margin-top:60px;
`

const SideBarHeader = styled.div`
    padding:13px;
    display:flex;
    border-bottom:1px solid #49274b;
    /* align-items: baseline; */
    >.MuiSvgIcon-root{
        padding:8px;
        color:#49274b;
        background-color:#fff;
        border-radius: 999px;
        font-size: 18px;
    }
    
  
`

const SideBarInfo = styled.div`
    flex:1;

    >h2{
      font-size:15px;
      font-weight:900;
      margin-bottom:15px;
    }
    >h3{
    display:flex;
    align-items:center;
    font-size:13px;
    font-weight:400;
    
    >.MuiSvgIcon-root{
        font-size:14px;
        margin-top:1px;
        margin-right:2px;
        color:lightgreen;
    }

    }
`