var express = require('express');
var router = express.Router();
var USER = require("../database/factura");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');


//SERVICIO GET

router.get("/factura", (req, res) => {

    var params = req.query;
    console.log(params);
    var id = params.id;
    if(params.id == null){
        res.status(300).json({msn: "Existen problemas"});
        return;
    }
    
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
    USER.find({_id : params.id}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
    
     });
    
    
 });

module.exports = router;