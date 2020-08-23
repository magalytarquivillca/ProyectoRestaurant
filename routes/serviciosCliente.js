var express = require('express');
var router = express.Router();
var USER = require("../database/cliente");
var fileUpload = require('express-fileupload');
var sha1 = require('sha1');


//SERVICIO POST
router.post('/cliente', async(req, res)  => {
    var params = req.body;

var cliente = new USER(params);
var result = await cliente.save();

res.status(200).json(result);
});

//SERVICIO GET

router.get("/restaurant", (req, res) => {
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

module.exports = router;
