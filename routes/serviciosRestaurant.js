var express = require('express');
var router = express.Router();
var USER = require("../database/restaurante");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');
var validate=require('../utils/validate');
var middleware=require('./middleware');


//SERVICIO POST
router.post('/restaurant',middleware, async(req, res)  => {
    var params = req.body;
    /*params["fechaderegistro"] = new Date();
    var coordenadas={};
    coordenadas['log']=params.longitud;
    coordenadas['lat']=params.latitud;
    params["ubicacion"]=coordenadas;*/
    if (validate.validarRestaurant(params,USER.schema.obj)!="true") {
            res.status(403).json(validate.validarRestaurant(params,USER.schema.obj));
            return;
    }
var restaurante = new USER(params);
var result = await restaurante.save();

res.status(200).json(result);
});

//SERVICIO GET

router.get("/restaurant",middleware, (req, res) => {
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

 //SERVICIO PATCH
 router.patch("/restaurant",middleware, (req, res) => {
    if (req.query.id == null) {
    res.status(300).json({
  
    });
    return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});

//SERVICIO PUT 

router.use(fileUpload({
    fileSize: 5 * 1024 * 1024
}));
router.put("/updatelogo",middleware, (req, res) => {

    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/logo");
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
        obj["pathfilel"] = totalpath;
        //obj["hash"] = totalpath;
        obj["relativepathl"] = "/getfile/?id=" + totalpath; //obj["hash"];
        console.log(obj);
        var objhelp={};
        objhelp['logo']=obj;
        USER.update({_id:  params.id}, {$set: objhelp /*updateobjectdata*/}, (err, docs) => {
		if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
        } 
        res.status(200).json(docs);
    	});
    });
});

router.put("/updatelugar",middleware, (req, res) => {
    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/lugar");
    console.log(path);
    var date = new Date();
    var foto  = sha1(date.toString()).substr(1, 5);
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
        var objhelp2={};
        objhelp2['fotolugar']=obj;
        USER.update({_id:  params.id}, {$set: objhelp2 /*updateobjectdata*/}, (err, docs) => {
		if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
           return;
        } 
        res.status(200).json(docs);
    	});
    });
});

router.put("/user",middleware, async(req, res) => {
    var params = req.query;
    var datos = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }

    var changed = ["nombre", "propietario", "calle","telefono","ubicacion","logo","fotolugar"];
    var keys = Object.keys(datos);
    var actualizardato = {};
    for (var i = 0; i < keys.length; i++) {
        if (changed.indexOf(keys[i]) > -1) {
            actualizardato[keys[i]] = datos[keys[i]];
        }
    }
    USER.update({_id:  params.id}, {$set: actualizardato}, (err, docs) => {
       if (err) {
           res.status(500).json({msn: "Existen problemas al actualizar en la base de datos"});
            return;
        } 
        res.status(200).json(docs);
    });

});


//SERVICIO DELETE

router.delete("/restaurant",middleware, async(req, res) => {
    if (req.query.id == null) {
       res.status(300).json({
      msn:"id no existe"
    });
       return;
    }
    var r = await USER.remove({_id: req.query.id});
   res.status(300).json(r);
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/getfile",middleware, async(req, res, next) => {
    var params = req.query;
    if (params == null) {
        res.status(300).json({
            msn: "Error es necesario un ID"
        });
        return;
    }
    var id = params.id;
    var usuario =  await USER.find({_id: id});
    console.log((usuario [0].logo.pathfilel ));
    if (usuario.length > 0) {
        var path = usuario[0].logo.pathfilel;
        if (path!=null) {
        res.sendFile(path);
        return;
    	}
    	else{
    		res.status(200).json(usuario[0]);
        	return;
    	}
    }
    res.status(300).json({
        msn: "Error en la petición"
    });
    return;
});

  
module.exports = router;
