const express=require('express')
const pm = require('../models/productos_model')

const router = express.Router()

router.get('/',function(req,res,next){

    pm.obtener().then(productos => {

        //res.json(productos)
        res.render('productos/ver',{productos:productos,})

    }).catch(err => {
        return res.status(500).send('Error en obtener productos')
    })
});

router.get('/agregar',function(req,res,next){

    res.render('productos/agregar')
});
router.post('/insertar',  function(req,res,next){
    //Obtener nombre y precio y esto va del body

    const {nombre,precio} = req.body
    if(!nombre||!precio){
        return res.status(500).send('No hay nombre o precio')
    }
    pm.insertar(nombre,'',precio).then(resultado => {
        res.json(resultado)
    }).catch(err => {
        res.status(500).send('Error insertando prodcuto')
    })
});

router.get('/eliminar/:id',  function(req,res,next){
    //200 //500
    pm.eliminar(req.params.id).then(()=>{
        res.status(200).send('Borrado correcto')
    }).catch(err => {
        res.status(500).send('Error al borrar')
    })

});

// /:id //404 //500 //200
router.get('/:id',  function(req,res,next){

    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.json(producto)
        }else{
           res.status(404).send('No se encontro el articulo') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el articulo') 

    })

});
router.get('/editar/:id',function(req,res,next){

    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.render('productos/editar',{producto:producto,})
        }else{
           res.status(404).send('No se encontro el articulo') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el articulo') 

    })
});
router.post('/actualizar',  function(req,res,next){
    const {id,nombre,precio} = req.body
    if(!nombre||!precio||!id){
        return res.status(500).send('No hay suficientes datos')
    }
    pm.actualizar(id,nombre,precio).then(()=>{
        return res.status(200).send('Actualizacion exitosa')

    }).catch(err=>{
        return res.status(500).send('No hay suficientes datos')
 
    })
});

module.exports=router