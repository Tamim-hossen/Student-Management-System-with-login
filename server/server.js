const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcrypt");

const app=express();

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "Public")))

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'webdb'
})
const port =5000;
const sr =10;
db.connect((err)=>{
    if(err){
        console.log("error connecting to Database")
    }
    else{
        console.log("Connected to Database")
    }
})

app.post('/add_user',async (req,res) => {
 const password =req.body.Password;
 const hashpass =await bcrypt.hash(password, sr);
 const values = [req.body.Name, req.body.Username, req.body.Email, hashpass]
 const tablename = req.body.Username;
 const email = req.body.Email;


 const sql1 = 'SELECT * FROM users WHERE `Email` = ?'
 const sql2 =  `
     CREATE TABLE webdb.\`${tablename}\` (
         ID INT(255) NOT NULL,
         Name VARCHAR(255) NOT NULL,
         Email VARCHAR(255) NOT NULL,
         Gender VARCHAR(255) NOT NULL,
         Age INT(50) NOT NULL,
         PRIMARY KEY (ID)
     ) ENGINE = InnoDB;
 `;
 const sql3 = "INSERT INTO users (`Name`,`Username`,`Email`,`Password`) VALUES (?,?,?,?)"
db.query(sql1,[email], (err, result) => {
    if(err){
        return res.status(500).json({message: "Database Error"})
    }
    if(result.length > 0){
        return res.status(409).json({message:"email used"})
      }

      db.query(sql2, tablename, (err) => {

        if(err){
            console.log(err)
            return res.status(404).json({message:"User exists"})
        }
        
    
        db.query(sql3,values, (err)=> {
           if(err){
               console.log(err)
               return res.status(500).json({message:"failed connecting to database"})
           }
           else{
            return res.status(200).json({message:"User creation Successful"})
        }
           
        })
     })

 })
})

app.post('/login', async (req,res)=> {
    try{
        const password = req.body.Password;
        const username = req.body.Username;
        let params = 'Username'
        if (username.includes('@')){
            params='Email'
        }
        const sql = `SELECT * FROM users WHERE ${params} = ?`
        
        db.query(sql,[username], async(err,result) => {
            if(err){
                console.error(err)
                return res.status(500).json({message: "Failed to fetch data from the server"})
            }
            if(result.length === 0){
                return res.status(404).json({message:'User not found'})
            }

            const user =result[0];
            const isMatch = await bcrypt.compare(password, user.Password);
            if(!isMatch){
                return res.status(401).json({message:"Wrong Password"})
            }

            else{
                return res.status(200).json({message: 'Login Successful',user})
            }

        })
    } catch (error) {
        console.error("server error")
        return res.status(500).json({message: " Internal Server Error"})
    }
    
})

app.get('/get_data/:dbName',(req,res)=>{
    const param = req.params.dbName;
    const sql = `SELECT ID, Name, Email, Gender, Age FROM ${param}`

    db.query(sql, (err,result)=>{
        if(err){
            console.error('Database error:', err);
            return res.status(500).json({message : 'server error'})
        }
        else if(result.length<1){
            return res.status(402).json({message:'no data'})
        }
        return res.json(result)
    })

})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    const dbdel = req.query.dbName
    const sql = `DELETE FROM ${dbdel} WHERE ID=? `

    db.query(sql, [id], (err) => {
        if(err){
            return res.status(500).json({message: 'Failed to delete'})
        }
        return res.status(200).json({message:'Deleted Successfully'})
    })
} )

app.post('/add_student',(req,res) => {
    const tbl = req.body.db;
    const values = [req.body.ID, req.body.Name, req.body.Email, req.body.Gender, req.body.Age]
    console.log(tbl)
    const sql = `INSERT INTO ${tbl} (ID,Name,Email,Gender,Age) VALUES (?, ?, ?, ?, ?) `

    db.query(sql,values, (err) => {
        if(err){
            console.log(err)
            return res.status(500).json({message: " Internal server Error"})
        }
        return res.status(200).json({message:'INformation input successful'})
    })

})
app.get('/get_stu', (req,res)=>{
    const id = req.query.ID;
    const param =  req.query.db;
    const sql= `SELECT * FROM ?? WHERE ID=?`

    db.query(sql,[param,id], (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).json({message:"Internal server error"})
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found." });
          }
  
        return res.status(200).json(result[0])
       
    })
})
app.put('/update_student',(req,res)=>{
    const  ID = req.body.ID;
    const tbl =req.body.tbl;
    const stdinfo =req.body.stdinfo
    const stdname = stdinfo.Name
    const stdem = stdinfo.Email
    const stdag = stdinfo.Age
    const stdge = stdinfo.Gender
    const values = [stdinfo.Name, stdinfo.Email,stdinfo.Age, stdinfo.Gender ]
    const sql = `UPDATE ?? SET Name=?, Email=?, Age=?, Gender=? WHERE ID= ?`

    db.query(sql,[tbl,stdname,stdem,stdag,stdge,ID],(err)=>{
        if(err){
            return res.status(500).json({message:'error updating database'})
        }
        return res.status(200).json({message: 'Update Successful'})
    })
})
app.listen(port, ()=>{
    console.log('Conntected')
})