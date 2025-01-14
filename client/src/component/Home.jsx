import React from 'react'
import { useLocation,Link,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
function Home() {
const location = useLocation()
const name  = location.state?.name || {}
const dbName= location.state?.user || {};
const[loggedIn,setLoggedIn] = useState(location.state?.isLoggedIn || false)
const[data,setData] = useState([]);
const [loading, setLoading] = useState(true);
const nav = useNavigate();
useEffect(() => {
  if (!dbName) return;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/get_data/${dbName}`);
      if (Array.isArray(res.data)) {
        setData(res.data);
        setLoading(false)
      } else {
        console.warn('Unexpected response format:', res.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  fetchData();
}, [dbName]);

async function deleteEntry(id){
  await axios.delete(`http://localhost:5000/delete/${id}`, {
    params: {dbName}
  })
  .then(() => {
    setData((prevdata) => prevdata.filter(student => student.ID !== id ))
  })
  .catch((err)=> console.log(err))
  
}

async function handlecreate(){
 nav('/create',{
  state:{
    user: dbName,
    isLoggedIn:true
  }
 })
}

  return (
    <div>
        {loggedIn? <div className='container-fluid vh-100 vw-100 align-items center'> 
            <div className='d-flex justify-content-end m-3'>
              <Link className='btn btn-danger' to={'/'} onClick={(e)=>{
                setLoggedIn(false)
                user = ""
                dbName=''
                name = '';
                }}>Log Out</Link>
            </div>
        <div>
          <div>
            
          </div>
          <div className='card p-4 m-3'>
            <h1 className='text-center'>Student Information system</h1>
            <div className='d-flex justify-content-end'>
            <button className='btn btn-success' onClick={handlecreate}>Add</button>
            </div>
            <div>
              <table className='table table-bordered table-hover mt-3'>
                <thead className='table-dark'>
                  <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((student) => (
                      <tr key={student.ID}>
                        <td>{student.ID}</td>
                        <td>{student.Name}</td>
                        <td>{student.Email}</td>
                        <td>{student.Age}</td>
                        <td>{student.Gender}</td>
                        <td className='d-flex justify-content-center'>
                          <button className='btn btn-info btn-sm mx-1' 
                          onClick={()=>{
                            nav(`/view/${student.ID}`,{state: {
                              user: dbName,
                              isLoggedIn : true
                            }})
                          }}
                          >View</button>
                          <button 
                          className="btn btn-warning btn-sm mx-1"
                          onClick={()=>{
                            nav(`/edit/${student.ID}`,{state:{
                              user: dbName,
                              isLoggedIn :true
                            }})
                          }}
                          >
                            Edit
                          </button>

                          <button className='btn btn-danger btn-sm mx-1' onClick={()=> {window.confirm("Are you Sure?")? deleteEntry(student.ID) : ''}}>Delete</button>
                        </td>
                      </tr>

                    ))
                  ): (<tr>
                        <td colSpan="6" className='text-center text-muted'>No students found</td>
                     </tr>
                ) }
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
        </div> : <div className='container-fluid vw-100 vh-100 p-4 align-items center mt-3'>
          <h1 className='text-center'>Please Log In</h1>
          <div className='d-flex justify-content-center m-3'>
            <Link className="btn btn-success" to={'/'}>Log In</Link>
          </div>
          </div>}
        
    </div>
  )
}

export default Home