const express = require('express');
const appServer = express();
var pandemias = new Array();
appServer.use(express.json());
appServer.listen(3000, ()=>{
    console.log('SERVER IS RUNNING ON PORT 3000');
});
appServer.post('/crearPandemia',
    (req,res) =>{
        pandemias.push(req.body);
        res.send('PANDEMIA CREADA');
});

appServer.post('/actualizarPais/:idPandemia',
    (req,res) =>{
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia){
                let index = -1;
                for (let j = 0; j < pandemias[i].paises.length; j++) {
                    if (pandemias[i].paises[j].nombre == req.body.nombre) {
                        //Editar la info del pais
                    }
                }
            }
        }
        res.send('INFO ACTUALIZADA');
});

appServer.get('/paisesPorPandemia/:idPandemia',
    (req, res) => {
        let index = -1;
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia) {
                index = i;
            }
        }
        if (index == -1){
            res.send('No se encontro la pandemia');
        }else{
            res.send(pandemias[index].paises);
        }
    }   
);

appServer.get('/myBasicInfo',
(req, res) => {
    res.send('HELLO WORLD WITH EXPRESS!!! my name is Jaime Leon');
}   
);



var pandemias = {}

appServer.get ('/info-pandemia:id',
(req, res) => {

    var ID= parseInt(id);
    var nombre;
    var sintomas;
    var recomendaciones;
    var cantidadPaises;
    var cantidadInfectados=0;
    var cantidadRecuperados=0;
    var cantidadMuertes=0;
    var paises;

    
    nombre = pandemias[ID].nombre;
    sintomas = pandemias[ID].sintomas;
    recomendaciones = pandemias[ID].recomendaciones;
    cantidadPaises = pandemias[ID].paises.length;
    
    for(var i = 0; i< cantidadPaises; i++){
        cantidadInfectados  +=    pandemias[ID].paises[i].infectados;
        cantidadRecuperados +=    pandemias[ID].paises[i].recuperados;
        cantidadMuertes     +=    pandemias[ID].paises[i].muertos;
    }
    
    paises = pandemias[ID].paises;


    var info = {ID, nombre, sintomas, recomendaciones, cantidadPaises, cantidadInfectados, cantidadRecuperados, cantidadMuertes, paises};

        res.send (info);
}
);
