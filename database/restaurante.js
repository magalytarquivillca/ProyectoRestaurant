
var mongoose =require('./connect');
var restaurantSchema = new mongoose.Schema({
nombreRestaurante: String,
nit:String,
propietario:String,
calle:String,
telefono:Number,
ubicacion:{
	log:String,
	lat:String
},
logo:{
	pathfilel:String,
	relativepathl:String
},
fechaderegistro:Date,
fotolugar:
{
	pathfile:String,
	relativepath:String
}
});
var restaurante=new mongoose.model('restaurant',restaurantSchema);
module.exports=restaurante;

