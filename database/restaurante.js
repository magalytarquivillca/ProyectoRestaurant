var mongoose =require('./connect');
var restaurantSchema = new mongoose.Schema({
nombre: String,
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
	relativefilel:String
},
fechaderegistro:Date,
fotolugar:
{
	pathfile:String,
	relativefile:String
}
});
var restaurante=new mongoose.model('restaurant',restaurantSchema);
module.exports=restaurante;

