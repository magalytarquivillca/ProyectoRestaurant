var mongoose = require("./connect");
var menuSchema = new mongoose.Schema({
    Nombre : String,
    ApellidoP : String,
    ApellidoM : String,
    CI : String,
    nombreRestaurante: String,
    NombreMenu : String,
    precioMenu : String,
    fechaderegistro : String,
    cantidad:Number,
    pagototal:Number,
    

});

var factura = mongoose.model("factura", menuSchema);
module.exports = factura;