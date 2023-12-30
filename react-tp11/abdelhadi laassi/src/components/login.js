import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../css/login.css' 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login () {
    const [data , setData] = useState(null)
    const [login , setLogin] = useState("bob@example.com")
    const [password , setPassword] = useState("bobspassword")
    const navigate = useNavigate();

    async function handleLogin() {
        const user = await data.find((user) => user.email === login && user.password === password);
        
        if (user) {
            localStorage.setItem('login', JSON.stringify(user));
            if(user.role == 'Formateur'){
                navigate('formateur/formations')
            } else if (user.role == "Participant"){
                navigate('/participant/formations')
            }
        } else {
            console.log("authentification doesn't work")
        }
    }

    useEffect(()=>{

        fetch('http://localhost:9000/utilisateurs')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setData(json)
        })
    },[])


    return (
        <div style={{display:"grid" , placeItems:"center" , height:"100vh"}}>
            <div className='login'>
                <h3>login</h3>
            <div>
                <div>

                    {/* <label for="username">Username: </label> */}
                    <TextField 
                    id="standard-basic" 
                    label="Username" 
                    variant="standard" 
                    value={login}
                    onChange={(e)=>{setLogin(e.target.value)}}
                    />            

                </div>
                <div>

                    {/* <label for="password">Password: </label> */}
                    <TextField 
                    id="standard-basic" 
                    label="Password" 
                    variant="standard" 
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />            

                </div>
                <Button onClick={handleLogin} variant="contained">sign in</Button>
            </div>
            </div>
        </div>
                )
}