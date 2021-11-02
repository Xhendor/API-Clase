const express= require('express')
const path= require('path')
const fs=require('fs')
const formidable= require('formidable')
const session= require('express-session')
const flash = require ('express-flash')
const  routerIndex =require('./routes/index')
const  routerProductos =require('./routes/productos')
const routerAuth = require('./routes/auth')
const cookieParser=require('cookie-parser')
const router = require('./routes/index')
const port = 3000
var app = express();

// Configuracion de engine de vistas en carpeta view de EJS
//npm install ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//npm install express-flash
app.use(flash())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: '123456abc',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: 60000}
}))

//npm install cookie-parser
app.use(cookieParser());
//Contenido estatico
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',routerIndex)
app.use('/productos',routerProductos)
app.use('/auth',routerAuth)
app.listen(port,function(){

    console.log('Example app ruta:localhost:'+port)
})