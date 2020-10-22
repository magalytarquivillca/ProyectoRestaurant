var a = require ("jsonwebtoken");
var b = require ("../database/cliente");
var c = async(req, res, next) => {
    var t = req.headers ["authorization"];
    if(t==null || t==""){
        res.status(403).json({ error : "Token nulo"});
        return;
    }
    try{

    var d = a.verify (t, "contraseña");
    if(d==null){
        res.status(403).json({error : "Token falso"});
        return;
    }
    
    var e = d.data;
    var f = await b.findOne({_id:e});
    if (f==null){
        res.status(403).json({ error : "No existe usuario"});
        return;
    }
    var g = f.acceso;
    var h = req.originalUrl.substr(1, 100);
    if (h.lastIndexOf("?") > -1){
        h = h.substring(0, h.lastIndexOf("?"));
    }
    var i = req.method;
    var j = h;
    //console.log(g);
    for (var ii=0; ii < g.method.length; ii++){

        if(i==g.method[ii] && j==g.services[ii]){
            next();
            return;
        }
    }
    res.status(403).json(["error: No tiene acceso"]);
    return;
    }
    catch(TokenExpiredError){
        res.status(403).json(["error: El tiempo ha termiando"]);
        return;
    }

}
module.exports = c;