var mongoose = require('./connect');
var ordenSchema = new mongoose.Schema({
idmenu:String,
idrestaurant:String,
cantidad:Number,
idcliente:String,
lugardeenvio:{
	lat:String,
	long:String
},
pagototal:Number
})
var orden = new  mongoose.model('orden',ordenSchema);
module.exports = orden;


