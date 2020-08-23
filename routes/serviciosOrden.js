var express = require('express');
var router = express.Router();
var USER = require("../database/menu");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');



//SERVICIO POST
router.post('/orden', async(req, res)  => {
    var params = req.body;
params["fechaderegistro"] = new Date();
var coordenadas={};
coordenadas['long']=params.longitud;
coordenadas['lat']=params.latitud;
params["lugardeenvio"]=coordenadas;

var orden = new USER(params);
var result = await orden.save();

res.status(200).json(result);
});

//SERVICIO GET

router.get("/orden", (req, res) => {
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

router.delete("/orden", async(req, res) => {
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

  
  module.exports = router;
  

