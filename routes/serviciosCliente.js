var express = require('express');
var router = express.Router();
var USER = require("../database/cliente");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');
var validate=require('../utils/validate');
var middleware=require('./middleware');


//SERVICIO POST
router.post('/cliente', async(req, res)  => {
    var params = req.body;
    //console.log(Object.keys(USER.schema.obj));
    if (validate.validarCliente(params,USER.schema.obj)!="true") {
        res.status(403).json(validate.validarCliente(params,USER.schema.obj));
        return;
    }
    var cliente = new USER(params);
    var result = await cliente.save();

    res.status(200).json(result);
});

//SERVICIO GET

router.get("/cliente",middleware, (req, res) => {
    var params = req.query;
    console.log(params);
    var limit = 100;
    if (params.limit != null) {
    limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
    if (params.order == "desc") {
    order = -1;
    } else if (params.order == "asc") {
    order = 1;
    }
    }
    var skip = 0;
    if (params.skip != null) {
    skip = parseInt(params.skip);
    }
    if (params.id==""||params.id==null) {
        USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
        });
    }else{
        USER.find({_id: params.id}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
        });
    }
 });

//SERVICIO UPDATE 
router.put("/cliente",middleware,(req,res)=>{
    var params=req.query;
    var datos=req.body;
    if (params.id==null) {
        res.status(300).json({msn:" es necesario un id"});
        return;
    }

    var filtro=["Nombre","ApellidoP","ApellidoM","CI"];
    var llaves=Object.keys(datos);
    var actualizado={};
    for (var i = 0; i < llaves.length; i++) {
        if (filtro.indexOf(llaves[i]>-1)) {
            actualizado[llaves[i]]=datos[llaves[i]];
        }
    }

    USER.update({_id: params.id},{$set:actualizado},(err,docs)=>{
        if (err) { 
            res.status(500).json({msn: "Existen problemas al actualizar en la base de datos"});
            return;
        } 
        res.status(200).json(docs);});
});



// sesion del usuario
router.post("/indexlogincliente", async(req,res)=>{
    var datos = req.body;
    if (datos.Nombre == null) {
        res.status(300).json({msn: "El nombre es necesario"});
             return;
    }
    if (datos.CI == null) {
        res.status(300).json({msn: "El CI es necesario"});
        return;
    }
    var results = await USER.find({Nombre: datos.Nombre, CI: datos.CI});
    if (results.length == 1) {
        var token = JWT.sign({
            exp: Math.floor(Date.now() / 1000)+(60*60),
            data: results[0].id
        },'contraseña');

        res.status(200).json({msn: "Bienvenido " + datos.Nombre , token:token });
        return;
    }

    res.status(200).json({msn: "credenciales incorrectas"});
});

module.exports = router;
