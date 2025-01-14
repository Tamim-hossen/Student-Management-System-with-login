import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Signup() {
    const [user, SetUser] =useState({
        Name: "",
        Username: "",
        Email: "",
        Password: "",
        ConPass: ""
    })
    const[prevuser,setPrevUser] = useState(false)
    const[prevEmail,setPrevEmail] = useState(false)
    const nav=useNavigate();
    const [show,setShow]=useState(false);
    const[wrong,setWrong] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
        console.log(user)
        if(user.Password === user.ConPass){
        axios.post('http://localhost:5000/add_user',user)
        .then((res) =>{
            nav('/')

        })
        .catch((err)=>{
            if(err.status === 404){
                setPrevUser(true);
            }
            if(err.status === 409){
                setPrevEmail(true);
            }
        })
    }
    else{
        setWrong(true)
    }

    }
  return (
    <div className='container-fluid vw-100 vh-100 p-4 align-items-center'>
        <div className='card p-5'>
            <h1 className='text-center mb-4'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className='from-group row mb-4'>
                        <label htmlFor='Name' className='col-sm-3 col-form-label'>Full Name: </label>
                        <div className='col-sm-9'>
                            <input 
                            type='text'
                            id ='Name'
                            className='form-control'
                            required
                            onChange={(e)=> SetUser({...user, Name: e.target.value})}/>
                        </div>
                    </div>
                    <div className='from-group row mb-1'>
                        <label htmlFor='Email' className='col-sm-3 col-form-label'>Email: </label>
                        <div className='col-sm-9'>
                            <input 
                            type='email'
                            id ='Email'
                            className='form-control'
                            style={prevEmail? {border: ' 1px solid tomato'}:{}}
                            required
                            onChange={(e)=> {
                                SetUser({...user, Email: e.target.value});
                                setPrevEmail(false)
                                }}/>
                            <div className='text-danger text-2' style={prevEmail? {visibility:'visible'}:{visibility:'hidden'}}>E-mail already used</div>
                        </div>
                    </div>
                    <div className='from-group row mb-1'>
                        <label htmlFor='Username' className='col-sm-3 col-form-label'>Username: </label>
                        <div className='col-sm-9 has-warning'>
                            <input 
                            type='text'
                            id ='Username'
                            className='form-control'
                            style = {prevuser? {border: '1px solid tomato'}: {}}
                            required
                            onChange={(e)=> {
                                SetUser({...user, Username: e.target.value});
                                setPrevUser(false)
                            }}/>
                            <div className='text-danger' style={prevuser?{visibility:'visible'}:{visibility:'hidden'}}>Username already taken! Choose a different one.</div>
                        </div>
                    </div>
                    <div className='from-group row mb-4'>
                        <label htmlFor='Password' className='col-sm-3 col-form-label'>Password: </label>
                        <div className='col-sm-9'>
                            <input 
                            type={show? 'text' : "password"}
                            id ='Password'
                            className='form-control'
                            style = {wrong? {border: '1px solid tomato'} : {} }
                            required
                            onChange={(e)=> {
                                SetUser({...user, Password: e.target.value}); 
                                setWrong(false)
                                }}/>
                        </div>
                    </div>
                    <div className='from-group row mb-4'>
                        <label htmlFor='Conpass' className='col-sm-3 col-form-label'>Confirm Password: </label>
                        <div className='col-sm-9'>
                            <input 
                            type= {show? 'text' : "password"}
                            id ='Conpass'
                            className='form-control'
                            style = {wrong? {border: '1px solid tomato'} : {} }
                            required
                            onChange={(e)=>{
                                SetUser({...user, ConPass: e.target.value});
                                setWrong(false);
                            }}/>
                            <span className='text-danger'style={wrong?{visibility:"visible"}:{visibility:'hidden'}}>Passwords do not match!</span>
                            <div className='from-check mb-1 position-relative'>
                            <input
                            type='checkbox'
                            value={show}
                            className='form-check-input'
                            id= 'show'
                            onClick={(e)=> setShow((prev) => !prev)}/>
                            <label style={{marginLeft: '10px'}}>Show Password</label>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className='d-flex justify-content-center mb-4'>
                        <button type="submit" className='btn btn-success'>Register</button>
                    </div>
                    
                    
                </form>

                    <label className='text-center mb-4'>Already Have an Account?</label>
                    <div className='d-flex justify-content-center'>
                    <Link id='login' className='btn btn-primary' to='/'>Log In</Link>
                    </div>
                    

        </div>

    </div>
  )
}

export default Signup