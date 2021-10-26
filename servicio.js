const express= require('express')
const path= require('path')
const fs=require('fs')
const formidable= require('formidable')
const session= require('express-session')
const  routerProductos =require('./routes/productos')
const port = 3000
const app=express();
app.use(express.json()) // for parsing application/json
app.use('/productos',routerProductos)
app.listen(port,function(){

    console.log('Example app ruta:localhost:'+port)
})