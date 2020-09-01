var express = require('express');
var router = express.Router();
var USER = require("../database/menu");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');
var validate=require('../utils/validate');
var middleware=require('middleware');



//SERVICIO POST
router.post('/orden', middleware , async(req, res)  => {
    var params = req.body;
    /*params["fechaderegistro"] = new Date();
    var coordenadas={};
    coordenadas['long']=params.longitud;
    coordenadas['lat']=params.latitud;
    params["lugardeenvio"]=coordenadas;*/
    if (validate.validarOrden(params,USER.schema.obj)!="true") {
        res.status(403).json(validate.validarOrden(params,USER.schema.obj));
        return;
    }
    var orden = new USER(params);
    var result = await orden.save();

    res.status(200).json(result);
});

//SERVICIO GET

router.get("/orden", middleware , (req, res) => {
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
    USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
     });
 });
 //SERVICIO DELETE

router.delete("/orden", middleware, async(req, res) => {
    if (req.query.id == null) {
       res.status(300).json({
      msn:"id no existe"
    });
       return;
    }
    var r = await USER.remove({_id: req.query.id});
   res.status(300).json(r);
});

//SERVICIO UPDATE

  router.put("/orden",middleware, async(req, res) => {
    var params = req.query;
    var datos = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }

    var changed = ["cantidad", "lugardeenvio", "pagototal"];
    var keys = Object.keys(datos);
    var actualizardato = {};
    for (var i = 0; i < keys.length; i++) {
        if (changed.indexOf(keys[i]) > -1) {
            actualizardato[keys[i]] = datos[keys[i]];
        }
    }
    USER.update({_id:  params.id}, {$set: actualizardato}, (err, docs) => {
       if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
            return;
        } 
        res.status(200).json(docs);
    });

});


module.exports = router;
  

