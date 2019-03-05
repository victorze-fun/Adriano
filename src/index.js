const express = require('express');
const { routeHelper, sleep, addUserToDB } = require('./route');

const app = express();

app.use(express.json());

app.get('/test', routeHelper(async (req, res) => {
    // await addUserToDB();
    await sleep(500);
    // await test(); // se desencadena un error que lo maneja routeHelper

    /*if (true) {
        // lanzamos este error, para que routeHerlper lo maneje
        throw new Error('Error crítico');
    }*/

    res.json({
        status: 'ok',
    });
}));

app.get('/test-2', routeHelper(async (req, res) =>{
    // código
}));

// sin routeHelper
app.get('/test-0', async (req, res) =>{
    try {
        await addUserToDB();
        await sleep(500);

        res.json({
            status: 'ok',
        });
    // manejamos el error, sin routeHelper
    } catch (error) {
        if (error.code) {
            res.status(400).json({
                status: 'error',
                message: error.message,
            });
        }
    }
});

app.listen(5000, () => console.log('API ready port: 5000...'));

