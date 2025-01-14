import React from 'react'
import { useLocation,useNavigate,Link,useParams } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';


function Edit() {
  const nav = useNavigate();
  const location = useLocation();
  const dbName = location.state?.user || " ";
  const [student,setStudent] = useState({
    ID: '',
    Name: '',
    Email: '',
    Gender: '',
    Age: ''
  })
  const [isLoggedIn, setIsLoggedIN] = useState(location.state?.isLoggedIn || false)
  const id = useParams().id;
  const info = useMemo(()=> ({
    ID: id,
    db:dbName
  }),[id,dbName])

  
  useEffect(()=>{
    axios.get(`http://localhost:5000/get_stu`, {params: info})
    .then((res)=>{
      if(res.status===200){
        setStudent(res.data)
      }
      else{
        throw new Error('Unable to get data')
      }
    }).catch((err)=>{
      console.error('Database Error')
    })
  },[info])

  function handleupdate(e){
    e.preventDefault();
    const para = {
      ID: id,
      tbl: dbName,
      stdinfo: student
    }
    axios.put('http://localhost:5000/update_student',para)
    .then((res)=>{
      if(res.status===200){
        console.log('successful');
        nav(`/home`,{state:{
          user:dbName,
          isLoggedIn:true
        }})
      }
      else{
        throw new Error('Update Unsuccessful')
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  if(!isLoggedIn){
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
    <div className='container-fluid vh-100 vw-100 align-items center'>
      <div className='d-flex justify-content-between mt-3 m-4'>
      <button className='btn btn-info' onClick={() => {
            nav('/home',{state : {
              isLoggedIn: true,
              user: dbName
            }})
          }}>Back</button>
        <Link className='btn btn-danger' to={'/'} onClick={()=>{
          setIsLoggedIN(false)
          dbName =''
        }} >Log Out</Link>
        
      </div>
      <div className='card p-4 mt-4 m-4'>
        <h4 className='text-center mb-4'>Edit Information of {student.Name}</h4>
        <form onSubmit={handleupdate}>
          <div className='form-group row mb-3 mt-3'>
            <label htmlFor = 'ID' className='col-sm-3 mt-1'>ID:</label>
            <div className='col-sm-9'>
              <h1 
              type='number'
              id = 'ID'
              style ={{border: '1px solid skyblue'}}
              className='form-control'>{student.ID}</h1>
            </div>
          </div>

          <div className='form-group row mb-3 mt-3'>
            <label htmlFor = 'Name' className='col-sm-3 mt-1'>Name:</label>
            <div className='col-sm-9'>
              <input 
              id= 'Nme'
              type='text'
              value ={student.Name}
              className='form-control'
              onChange={(e)=>{
                setStudent({...student, Name: e.target.value})
              }}/>
            </div>
          </div>

          <div className='form-group row mb-3 mt-3'>
            <label htmlFor = 'Email' className='col-sm-3 mt-1'>Email:</label>
            <div className='col-sm-9'>
              <input 
              type='email'
              id = 'Email'
              value ={student.Email}
              className='form-control'
              onChange={(e)=>{
                setStudent({...student, Email: e.target.value})
              }}/>
            </div>
          </div>

          <div className='form-group row mb-3 mt-3'>
            <label htmlFor = 'Gender' className='col-sm-3 mt-1'>Gender:</label>
            <div className='col-sm-9'>
              <select 
              id='Gender'
              value ={student.Gender}
              className='form-control'
              onChange={(e)=>{
                setStudent({...student, Gender: e.target.value})
              }}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Others'>Others</option>
              </select>
            </div>
          </div>

          <div className='form-group row mb-3 mt-3'>
            <label htmlFor = 'Age' className='col-sm-3 mt-1'>Age:</label>
            <div className='col-sm-9'>
              <input 
              id='Age'
              type='number'
              value ={student.Age}
              className='form-control'
              onChange={(e)=>{
                setStudent({...student, Age: e.target.value})
              }}/>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className=' btn btn-success'>Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Edit
