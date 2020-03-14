const express = require('express');
const appServer = express();
var pandemias = new Array();
appServer.use(express.json());
appServer.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

appServer.post('/crearPandemia',
    (req, res) => {
        pandemias.push(req.body);
        res.send('PANDEMIA CREADA');
    }
);

appServer.post('/actualizarPais/:idPandemia',
    (req, res) => {
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia) {
                var index = -1;
                for (let j = 0; j < pandemias[i].paises.length; j++) {
                    if (pandemias[i].paises[j].nombre == req.body.nombre) {
                        pandemias[i].paises[j] = req.body;
                    }
                }

            }
        }
        if (index == -1) {
            res.send('No se encontro la pandemia');
        } else {
            res.send('INFO ACTUALIZADA');
        }

    }
);

appServer.get('/paisesPorPandemia/:idPandemia',
    (req, res) => {
        let index = -1;
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia) {
                index = i;
            }
        }
        if (index == -1) {
            res.send('No se encontro la pandemia');
        } else {
            res.send(pandemias[index].paises);
        }
    }
);

appServer.post('/curarPais/:idPandemia/:idPais',
    (req, res) => {
        var index = -1;
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia) {
                var indexJ = -1;
                for (let j = 0; j < pandemias[i].paises.length; j++) {
                    if (pandemias[i].paises[j].nombre == req.params.idPais) {
                        indexJ = j;
                        index = i;
                    }
                }
            }
        }
        if (index == -1 || indexJ == -1) {
            res.send('No se encontro la pandemia o el pais');
        } else {
            pandemias[index].paises[indexJ].recuperados = Number(pandemias[index].paises[indexJ].recuperados) + Number(pandemias[index].paises[indexJ].infectados) - Number(pandemias[index].paises[indexJ].muertos);
            pandemias[index].paises[indexJ].infectados = '0';
            pandemias[index].encurso = false;
            console.log(pandemias[index].encurso);
            res.send('País Curado');
        }
    }
);


appServer.get('/info-pandemia/:idPandemia',
    (req, res) => {
        var nombre;
        var sintomas;
        var recomendaciones;
        var cantidadPaises;
        var cantidadInfectados = 0;
        var cantidadRecuperados = 0;
        var cantidadMuertes = 0;
        var paises;
        
        var index = -1;
        for (let i = 0; i < pandemias.length; i++) {
            if (pandemias[i].id == req.params.idPandemia) {
                index = i;
            }
        }
        if (index == -1) {
            res.send('No se encontro la pandemia');
        } else {
            nombre = pandemias[index].nombre;
            sintomas = pandemias[index].sintomas;
            recomendaciones = pandemias[index].recomendaciones;
            cantidadPaises = pandemias[index].paises.length;
            paises = pandemias[index].paises;
    
            for (var j = 0; j < cantidadPaises; j++) {
                cantidadInfectados += pandemias[index].paises[j].infectados;
                cantidadRecuperados += pandemias[index].paises[j].recuperados;
                cantidadMuertes += pandemias[index].paises[j].muertos;
            }
            index= Number(index)+1;
            var info = { index, nombre, sintomas, recomendaciones, cantidadPaises, cantidadInfectados, cantidadRecuperados, cantidadMuertes, paises };
            res.send(info);
        }
    }
);