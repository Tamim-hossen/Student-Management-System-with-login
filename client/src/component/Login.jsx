import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [login,setLogin] = useState({
        Username:"",
        Password: ""
    })
    const [wrongPassword,setWrongPassword] =useState(false)
    const [wrongUsername, setWrongUsername] = useState(false)
    const [show,setShow] = useState(false)
    const nav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] =useState(false);

    async function handlelogin(e){
        e.preventDefault();

        try{
            const res= await axios.post('http://localhost:5000/login',login)
            if(res.status === 200){
                setIsLoggedIn(true)
                nav('/home',{
                    state: {
                        isLoggedIn: true,
                        user: res.data.user.Username,
                        name: res.data.user.Name
                        
                    }
                }
                )
                
            }
        } catch (err){
            if(err.response){
                if(err.response.status === 404){
                    setWrongUsername(true)
                }
                else if(err.response.status === 401){
                    setWrongPassword(true)
                }
                else{
                    window.alert("An error occured. Please try again")
                }
            }
        }

    }
  return (
    <div className='container-fluid vw-100 vh-100 p-4 align-items center'>
        <div className='card p-4'>
            <h1 className='text-center'>Log In</h1>
            <form onSubmit={handlelogin}>
                <div className='form-group row m-3 '>
                    <label htmlFor='username' className='col-sm-3'>Username or e-mail:</label>
                    <div className='col-sm-9'>
                        <input 
                        type='text'
                        placeholder='Username or e-mail'
                        id= "username"
                        className='form-control'
                        style ={wrongUsername? {border: '1px solid tomato'} : {}}
                        required
                        onChange={(e) => {
                            setLogin({...login, Username: e.target.value});
                            setWrongUsername(false);
                            }}/>
                        <span className='text-danger'style={wrongUsername? {visibility:'visible'} : {visibility:'hidden'}}>Wrong Username or e-mail</span>
                        
                    </div>
                    
                </div>
                <div className='form-group row m-3'>
                    <label htmlFor='Password' className='col-sm-3'>Password:</label>
                    <div className='col-sm-9'>
                        <input 
                        type= {show? 'text' : "password"}
                        placeholder='Password'
                        id= "Password"
                        className='form-control'
                        style ={wrongPassword? {border: '1px solid tomato'} : {}}
                        required
                        onChange={(e) => {
                            setLogin({...login, Password: e.target.value});
                            setWrongPassword(false)}} />
                            <div className='text-danger' style= {wrongPassword?{visibility: 'visible'}:{visibility:'hidden'}}>Wrong Password</div>
                        <div className='form-check'>
                             <label>Show Password</label>
                             <input
                             type= 'checkbox'
                             value= {show}
                             className='form-check-input'
                             onChange={()=>setShow((prev) => !prev)}/>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <button type= 'submit' className='btn btn-primary'>Log In</button>
                </div>
            </form>
                <label className='text-center p-4'>Don't have an account?</label>
                <div className='d-flex justify-content-center mb-3'>
                    <Link id='signup' className='btn btn-success' to = "/signup">Sign Up</Link>
                </div>
            
        </div>
    </div>
  )
}

export default Login