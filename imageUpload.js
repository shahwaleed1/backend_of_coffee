const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')

const Port = 5000

const upload = multer({
    dest: './Upload',
})

app.post('/upload', upload.single('thumnail'), (req, res)=>{
    console.log(req.file)
})

app.listen(Port, ()=>console.log(`start on ${Port}`))