import styled from "styled-components"
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";


const Header = ()=>{

    const [user] = useAuthState(auth)

    return <div>
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar onClick={userLogOut} src={user?.photoURL}/>
                <AccessTimeIcon/>
            </HeaderLeft>
            <HeaderCenter>
                <SearchIcon/>
                <HeaderSearch placeholder="Search"/>
            </HeaderCenter>
            <HeaderRight>
                <HelpOutlineOutlinedIcon/>
            </HeaderRight>
        </HeaderContainer>
    </div>

    function userLogOut(e) {
        e.preventDefault();
        auth.signOut()
        
    }
}

const HeaderContainer = styled.header`
    display : flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    position: fixed;
    width: 100%;
    background-color: var(--slack-color);
    color:white;
`
const HeaderLeft = styled.div`
            display: flex;
            align-items: center; 
            flex:0.3;
            > .MuiSvgIcon-root{
                margin-left:auto;
                margin-right:30px;
            }

           
`

const HeaderAvatar = styled(Avatar)`
        cursor:pointer;

        :hover{
            opacity:0.8;
        }
        
    `


const HeaderCenter = styled.div`
        display : flex;
        flex:0.4; 
        align-items:center;
        color:gray;
        border: 1px solid gray;
        background-color: #421f44;
        border-radius:5px;
        padding:.75px 50px;
        opacity:1;
        
`
const HeaderSearch = styled.input`

        background-color: #421f44;
        color:gray;
        margin-left:5px;
        text-align:center;
        min-width:30vw;
        outline:none;
        border:none;   
        :focus{
            text-align:left;
            ::placeholder{
                opacity:0;
            }
        }
`

const HeaderRight = styled.div`
        display:flex;
        flex:0.3;
        align-items :flex-end;
        > .MuiSvgIcon-root{
                margin-left:auto;
                margin-right:20px;
            }

`

export default Header