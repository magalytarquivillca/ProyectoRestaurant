var mongoose = require("./connect");
var menuSchema = new mongoose.Schema({
    NombreMenu : String,
    precioMenu : String,
    descripcion : String,
    fechaderegistro : String,
fotografia_del_producto : {
        relativepath: String,
        pathfile:String   
    },  
});

var menu = mongoose.model("menu", menuSchema);
module.exports = menu;