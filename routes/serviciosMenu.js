var express = require('express');
var router = express.Router();
var USER = require("../database/menu");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');
var validate=require('../utils/validate');
var middleware=require('./middleware');



//SERVICIO POST
router.post('/menu',middleware, async(req, res)  => {
    var params = req.body;
    //params["fechaderegistro"] = new Date();
    if (validate.validarMenu(params,USER.schema.obj)!="true") {
            res.status(403).json(validate.validarMenu(params,USER.schema.obj));
            return;
    }
    var menu = new USER(params);
    var result = await menu.save();

    res.status(200).json(result);
});

//SERVICIO GET

router.get("/menu",middleware, (req, res) => {
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


//SERVICIO PUT 

router.use(fileUpload({
    fileSize: 5 * 1024 * 1024
}));
router.put("/updateproducto",middleware, (req, res) => {

    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/producto");
    console.log(path);
    var date = new Date();
    var foto  = sha1(date.toString()).substr(1, 5);
    console.log(' datos  ');
    console.log(req.files);
    console.log(Object.keys(req.files.file));

    var totalpath = path + "/" + foto + "_" + image.name.replace(/\s/g,"_");
    console.log(totalpath);
    image.mv(totalpath, (err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        obj["pathfile"] = totalpath;
        //obj["hash"] = totalpath;
        obj["relativepath"] = "/getfile/?id=" + totalpath; //obj["hash"];
        console.log(obj);
        var objhelp={};
        objhelp['fotografia_del_producto']=obj;
        USER.update({_id:  params.id}, {$set: objhelp /*updateobjectdata*/}, (err, docs) => {
		if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
        } 
        res.status(200).json(docs);
    	});
    });
});
//SERVICIO DELETE

router.delete("/menu",middleware, async(req, res) => {
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
router.put("/menu",middleware,(req,res)=>{
    var params=req.query;
    var datos=req.body;
    if (params.id==null) {
        res.status(300).json({msn:" es necesario un id"});
        return;
    }
    
    var filtro=["Nombre","precio","descripcion","fotografia_del_producto"];
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


module.exports = router;


