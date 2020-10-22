var validar = {
validarRestaurant: function(sendDatos, evalueDatos) {
var msn="";


for (var i = 0; i < Object.keys(evalueDatos).length; i++) {
	var cont=0;
	for (var j = 0; j < Object.keys(sendDatos).length; j++) {
		if (Object.keys(sendDatos)[j]==Object.keys(evalueDatos)[i]) {
			cont++;
		}
		if (Object.keys(evalueDatos)[i]=="fechaderegistro") {
			cont++;
		}
		if (Object.keys(evalueDatos)[i]=="logo") {
			cont++;
		}
		if (Object.keys(evalueDatos)[i]=="fotolugar") {
			cont++;
		}
		if (Object.keys(sendDatos)[j]=="ubicacion") {
			cont++;
		}

	}
	if (cont==0) {
		msn=msn+Object.keys(evalueDatos)[i]+" no existe - ";
	}
}
if (msn!="") {
	msn="añadir datos: "+msn;
	return msn;
}

if (sendDatos.nombre!=""||sendDatos.nombre!=null) {
	if (sendDatos.nit!=""||sendDatos.nit!=null) {
		if (sendDatos.propietario!=""||sendDatos.propietario!=null) {
			if (sendDatos.calle!=""||sendDatos.calle!=null) {
				if (sendDatos.telefono!=""||sendDatos.telefono!=null) {
					if (sendDatos.ubicacion==""||sendDatos.ubicacion==null) {
						var coordenadas={};
						coordenadas['log']=params.longitud;
						coordenadas['lat']=params.latitud;
						sendDatos["ubicacion"]=coordenadas;
					}
					if (sendDatos.ubicacion!=""||sendDatos.ubicacion!=null) {
						if (sendDatos.logo!=""||sendDatos.logo!=null) {
							if (sendDatos.fechaderegistro==""||sendDatos.fechaderegistro==null) {
								sendDatos["fechaderegistro"] = new Date();
							}
							if (sendDatos.fechaderegistro!=""||sendDatos.fechaderegistro!=null) {
								if (sendDatos.fotolugar!=""||sendDatos.fotolugar!=null) {
									msn="true";
									return msn;
								} else {
									msn="debe añadir la fotolugar";
									return msn;
								}
							} else {
								msn="debe añadir la fechaderegistro";
								return msn;
							}
						} else {
							msn="debe añadir el logo";
							return msn;
						}
					} else {
						msn="debe añadir la ubicacion";
						return msn;
					}
				} else {
					msn="debe añadir el telefono";
					return msn;
				}
			} else {
				msn="debe añadir la calle";
				return msn;
			}
		} else {
			msn="debe añadir el propietario";
			return msn;
		}
	} else {
		msn="debe añadir el nit";
		return msn;
	}
} else {
	msn="debe añadir el nombre";
	return msn;
}
//
},
validarMenu: function(sendDatos, evalueDatos) {
var msn="";
for (var i = 0; i < Object.keys(evalueDatos).length; i++) {
	var cont=0;
	for (var j = 0; j < Object.keys(sendDatos).length; j++) {
		if (Object.keys(sendDatos)[j]==Object.keys(evalueDatos)[i]) {
			cont++;
		}

	}
	if (cont==0) {
		msn=msn+Object.keys(evalueobj)[i]+" no existe - ";
	}
}
if (msn!="") {
	msn="añadir datos: "+msn;
	return msn;
}

if (sendDatos.Nombre!=""||sendDatos.Nombre!=null) {
	if (sendDatos.precio!=""||sendDatos.precio!=null) {
		if (sendDatos.descripcion!=""||sendDatos.descripcion!=null) {
			if (sendDatos.fechaderegistro==""||sendDatos.fechaderegistro==null) {
				sendDatos["fechaderegistro"] = new Date();
			}
			if (sendDatos.fechaderegistro!=""||sendDatos.fechaderegistro!=null) {
				if (sendDatos.fotografia_del_producto!=""||sendDatos.fotografia_del_producto!=null) {
					msn="true";
					return msn;
				} else {
					msn="debe añadir la foto del producto";
					return msn;
				}
			} else {
				msn="debe añadir la fecha de registro";
				return msn;
			}
		} else {
			msn="debe añadir la descripcion";
			return msn;
		}
	} else {
		msn="debe añadir el precio";
		return msn;
	}
} else {
	msn="debe añadir el Nombre";
	return msn;
}
//
},
validarOrden: function(sendDatos, evalueDatos) {
var msn="";
for (var i = 0; i < Object.keys(evalueDatos).length; i++) {
	var cont=0;
	for (var j = 0; j < Object.keys(sendDatos).length; j++) {
		if (Object.keys(sendDatos)[j]==Object.keys(evalueDatos)[i]) {
			cont++;
		}

	}
	if (cont==0) {
		msn=msn+Object.keys(evalueDatos)[i]+" no existe - ";
	}
}
if (msn!="") {
	msn="añadir datos: "+msn;
	return msn;
}
//params["fechaderegistro"] = new Date();   ?

if (sendDatos.idmenu!=""||sendDatos.idmenu!=null) {
	if (sendDatos.idrestaurant!=""||sendDatos.idrestaurant!=null) {
		if (sendDatos.idcliente!=""||sendDatos.idcliente!=null) {
			if (sendDatos.cantidad!=""||sendDatos.cantidad!=null) {
				if (parseInt(sendDatos.cantidad)!=0&&parseInt(sendDatos.cantidad)!=null) {
					msn="no es un dato numerico valido";
					return msn;
				}
				if (sendDatos.lugardeenvio==""||sendDatos.lugardeenvio==null) {
					if (sendDatos.longitud!=""||sendDatos.longitud!=null&&sendDatos.latitud!=""||sendDatos.latitud!=null) {
						var coordenadas={};
						coordenadas['long']=sendDatos.longitud;
						coordenadas['lat']=sendDatos.latitud;
						sendDatos["lugardeenvio"]=coordenadas;
					}
				}
				if (sendDatos.lugardeenvio!=""||sendDatos.lugardeenvio!=null) {
					if (sendDatos.pagototal==""||sendDatos.pagototal==null) {
						sendDatos["pagototal"]=parseInt(idmenu)*parseInt(sendDatos.cantidad);
					}
					if (sendDatos.pagototal!=""||sendDatos.pagototal!=null) {
						msn="true";
						return msn;
					} else {
						msn="debe añadir el pagototal";
						return msn;
					}
				} else {
					msn="debe añadir el lugardeenvio";
					return msn;
				}
			} else {
				msn="debe añadir la fecha de cantidad";
				return msn;
			}
		} else {
			msn="debe añadir la idcliente";
			return msn;
		}
	} else {
		msn="debe añadir el idrestaurant";
		return msn;
	}
} else {
	msn="debe añadir el idmenu";
	return msn;
}
//
},
validarCliente: function(sendDatos, evalueDatos) {
var msn="";
for (var i = 0; i < Object.keys(evalueDatos).length; i++) {
	var cont=0;
	for (var j = 0; j < Object.keys(sendDatos).length; j++) {
		if (Object.keys(sendDatos)[j]==Object.keys(evalueDatos)[i]) {
			cont++;
		}
		if (Object.keys(evalueDatos)[i]=="acceso") {
			cont++;
		}

	}
	if (cont==0) {
		msn=msn+Object.keys(evalueDatos)[i]+" no existe - ";
	}
}
if (msn!="") {
	msn="añadir datos: "+msn;
	return msn;
}

if (sendDatos.Nombre!=""||sendDatos.Nombre!=null) {
	if (sendDatos.ApellidoP!=""||sendDatos.ApellidoP!=null) {
		if (sendDatos.ApellidoM!=""||sendDatos.ApellidoM!=null) {
			if (sendDatos.CI!=""||sendDatos.CI!=null) {
				/*if (parseInt(sendDatos.CI)!=0&&parseInt(sendDatos.CI)!=null) {
                    msn = "Existen problemas en la base de datos";
                    return msn;
                }*/

				if (sendDatos.lugardeenvio!=""||sendDatos.lugardeenvio!=null) {
					
					if (sendDatos.Correo!=""||sendDatos.Correo!=null) {

                        if (!/^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(sendDatos.Correo)) {
                            msn="el email tiene datos incorrectos";
                            return msn;
                            /*msn = "Existen problemas en la base de datos";
                            return msn;*/
                        }

                        if (sendDatos["acceso"]==""||sendDatos["acceso"]==null) {
                            var acceso={};
                            acceso["method"]=["POST","GET","GET","GET","DELETE","GET","GET","PUT","GET"]
                            acceso["services"]=["orden","orden","restaurant","menu","orden","factura","cliente","cliente","getfile"]
                            sendDatos["acceso"]=acceso;
                        }else {
                            msn="no puede añadir los accesos sin administracion";
                            return msn;
                        }

                        if (sendDatos["acceso"]!=""||sendDatos["acceso"]!=null) {
                            msn="true";
                             return msn;
                        } else {
                            msn="no se pudo añadir los accesos";
                            return msn;
                        }
					} else {
						msn="no se pudo añadir el email";
						return msn;
					}
				} else {
					msn="debe añadir el lugardeenvio";
					return msn;
				}
			} else {
				msn="debe añadir el CI";
				return msn;
			}
		} else {
			msn="debe añadir el Apellido Materno";
			return msn;
		}
	} else {
		msn="debe añadir el Apellido Paterno";
		return msn;
	}
} else {
	msn="debe añadir el Nombre";
	return msn;
}
//
},

};
module.exports = validar;
/*

*/




