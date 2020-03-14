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
