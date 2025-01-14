import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useLocation,Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useMemo } from 'react'

function View() {
  const location = useLocation();
  const dbName = location.state?.user || ""
  const [isLoggedIn, setIsLoggedIn] = useState(location.state?.isLoggedIn || false)
  const [student,setStudent] = useState([])
  const id = useParams().id;
  const info = useMemo(()=>({
    ID: id,
    db: dbName
  }),[id,dbName])

  const nav = useNavigate();
 

  useEffect(()=>{
    
    axios.get('http://localhost:5000/get_stu',{params:info})
    .then((res)=>{
      if(res.status === 200){
        setStudent(res.data)
      }
    }).catch((err)=>{
      console.log(err)
    })
  },[info])
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
      <div className='card p-4 mb-3' style= {{marginLeft: '20px', marginRight:'20px', marginTop: '20px'}}>
        <h1 className='text-center'>Information of {student.Name}</h1>
        <div className='d-flex justify-content-start mb-3'> 
          <button className='btn btn-info btn-sm mx-1' onClick={()=> {
            nav('/home', {state: {
              user: dbName,
              isLoggedIn: true
            }})
          }}>Back</button> 
        </div>
        {student ? (
          <ul className='list-group'>
            <li className='list-group-item'>
              <div className='row'>
                <b className='col-sm-2'>ID:</b>
                <b className='col-sm-10'>{student.ID}</b>
              </div>
              </li>
              <li className='list-group-item'>
              <div className='row'>
                <b className='col-sm-2'>Name:</b>
                <b className='col-sm-10'>{student.Name}</b>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='row'>
                <b className='col-sm-2'>Email:</b>
                <b className='col-sm-10'>{student.Email}</b>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='row'>
                <b className='col-sm-2'>Gender:</b>
                <b className='col-sm-10'>{student.Gender}</b>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='row'>
                <b className='col-sm-2'>Age:</b>
                <b className='col-sm-10'>{student.Age}</b>
              </div>
            </li>
            
          </ul>
        ): ''}
       

      </div>
    </div>
  )
}

export default View