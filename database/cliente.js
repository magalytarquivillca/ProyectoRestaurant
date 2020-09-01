var mongoose = require("./connect");
var menuSchema = new mongoose.Schema({
    Nombre : String,
    ApellidoP : String,
    ApellidoM : String,
    CI : String,
    Correo : String,

    acceso:{
    	method:String,
    	services:String
    }
});

var menu = mongoose.model("cliente", menuSchema);
module.exports = menu;