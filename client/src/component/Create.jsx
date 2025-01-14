import React from 'react'
import { useState } from 'react'
import { useLocation,useNavigate,Link } from 'react-router-dom'
import axios from 'axios';

function Create() {
  const location =useLocation();
  const dbName = location.state?.user || '';
  const [loggedin, setLoggedIn] = useState (location.state?.isLoggedIn || false)
  const [student,setStudent] = useState({
    ID: "",
    Name: " " ,
    Email: "",
    Gender: "",
    Age:"",
    db: dbName

  })
  const nav = useNavigate();

function handlecreate(e){
  e.preventDefault();
  axios.post('http://localhost:5000/add_student',student)
  .then((res) => {
      if(res.status === 200 ){
        nav('/home', {state : {
          isLoggedIn:true,
          user: dbName
        }})
      }
      else{
        console.log(error)
      }
  }).catch((err) => {
    console.log(err)
  })
  console.log(student)
   

  }

  if(!loggedin){
    return(
      <div className='container-fluid vw-100 vh-100 p-4 align-items center mt-3'>
        <h1 className='text-center'>Please Log In</h1>
        <div className='d-flex justify-content-center m-3'>
          <Link className="btn btn-success" to={'/'}>Log In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='containter-fluid vh-100 vw-100 align-items center'>
        <div>
        <div className='d-flex justify-content-between m-5 mt-3 mb-4'>
        <button className='btn btn-info' onClick={() => {
            nav('/home',{state : {
              isLoggedIn: true,
              user: dbName
            }})
          }}>Back</button>
          <Link className='btn btn-danger' to ={'/'} onClick={() => {
            setLoggedIn(false);
            dbName = '';
          }}>Log Out</Link>
      </div>
        
        </div>
      <div className='card p-4 m-5 mt-2'>
        <h4 className='text-center mb-3'>Enter Student Information</h4>
        <form onSubmit={handlecreate}>
          <div className='from-group row mb-3'>
            <label htmlFor='ID' className='col-sm-2 mt-1'> Student ID:</label>
            <div className='col-sm-10'>
              <input 
              id='ID'
              className='form-control'
              type= 'number'
              required
              onChange={(e)=>{
                setStudent({...student, ID: e.target.value})
              }}
              
              />
            </div>
          </div>
          <div className='from-group row mb-3'>
            <label htmlFor='ID' className='col-sm-2 mt-1'> Name:</label>
            <div className='col-sm-10'>
              <input 
              id='Name'
              className='form-control'
              type= 'text'
              required
              onChange={(e)=>{
                setStudent({...student, Name: e.target.value})
              }}
              />
            </div>
          </div>
          <div className='from-group row mb-3'>
            <label htmlFor='email' className='col-2 mt-1'> Email:</label>
            <div className='col-sm-10'>
              <input 
              id='email'
              className='form-control'
              type= 'email'
              required
              onChange={(e)=>{
                setStudent({...student, Email: e.target.value})
              }}
              />
            </div>
          </div>
          <div className='from-group row mb-3'>
            <label htmlFor='Gender' className='col-sm-2 mt-1'> Gender:</label>
            <div className='col-sm-10'>
              <select 
              id='Gender'
              className='form-control'
              type=""              
              required
              onChange={(e)=>{
                setStudent({...student, Gender: e.target.value})
              }}
              >
                <option value="">Select your option</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Others'>Others</option>
              </select>
            </div>
          </div>
          <div className='from-group row mb-3'>
            <label htmlFor='Age' className='col-sm-2 mt-1'> Age:</label>
            <div className='col-sm-10'>
              <input 
              id='Age'
              className='form-control'
              type= 'number'
              required
              onChange={(e)=>{
                setStudent({...student, Age: e.target.value})
              }}
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-success'>Submit</button>
          </div>
        </form>
      </div>
      </div>
  )
}

export default Create