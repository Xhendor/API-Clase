const express=require('express')
const pm = require('../models/productos_model')

const router = express.Router()

router.get('/',function(req,res,next){
    // Validar si tiene session activa
    if(req.session.loggedIn){
    pm.obtener().then(productos => {

        //res.json(productos)
        res.render('productos/ver',{productos:productos,})

    }).catch(err => {
        return res.status(500).send('Error en obtener productos')
    })
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
  }
});

router.get('/agregar',function(req,res,next){
    if(req.session.loggedIn){
    res.render('productos/agregar')
}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login') 
}
});


router.post('/insertar',  function(req,res,next){
    //Obtener nombre y precio y esto va del body
if(req.session.loggedIn){
    const {nombre,precio} = req.body
    if(!nombre||!precio){
        return res.status(500).send('No hay nombre o precio')
    }
    pm.insertar(nombre,'',precio).then(resultado => {
        res.json(resultado)
    }).catch(err => {
        res.status(500).send('Error insertando prodcuto')
    })

}else{
    req.flash('error','Tiene que iniciar session primero!!')
    res.render('auth/login')
}

});

router.get('/eliminar/:id',  function(req,res,next){
    //200 //500
    if(req.session.loggedIn){
    pm.eliminar(req.params.id).then(()=>{
        res.status(200).send('Borrado correcto')
    }).catch(err => {
        res.status(500).send('Error al borrar')
    })}else{
        req.flash('error','Tiene que iniciar session primero!!')
        res.render('auth/login')
    }

});

// /:id //404 //500 //200
router.get('/:id',  function(req,res,next){
    if(req.session.loggedIn){
       
    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.json(producto)
        }else{
           res.status(404).send('No se encontro el articulo') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el articulo') 

    })
}else{
    res.render('error',{message:'Acceso restringido',error:{status:301,stack:''}})
  }
});
router.get('/editar/:id',function(req,res,next){
    if(req.session.loggedIn){
    pm.obtenerPorId(req.params.id).then(producto =>{
        if(producto){
            res.render('productos/editar',{producto:producto,})
        }else{
           res.status(404).send('No se encontro el articulo') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el articulo') 

    })}else{
        req.flash('error','Tiene que iniciar session primero!!')
        res.render('auth/login')
    }
});
router.post('/actualizar',  function(req,res,next){
   
   if(req.session.loggedIn){
    const {id,nombre,precio} = req.body
    if(!nombre||!precio||!id){
        return res.status(500).send('No hay suficientes datos')
    }
    pm.actualizar(id,nombre,precio).then(()=>{
        return res.status(200).send('Actualizacion exitosa')

    }).catch(err=>{
        return res.status(500).send('No hay suficientes datos')
 
    })}else{
        req.flash('error','Tiene que iniciar session primero!!')
        res.render('auth/login')
    }
});

module.exports=router