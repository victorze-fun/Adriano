const express = require('express');
const { routeHelper, sleep, addUserToDB } = require('./route');

const app = express();

async function getUser() {
    return {
        id: 123,
        name: 'victor',
    }
}

// todas las rutas ejecutan este middleware
app.use((req, res, next) => {
    if (req.ip == '182.15.25.48') {
        next(new Error('error!!!'));
    }
    next();
});

const foo = async (req, res, next) => {
    const user = await getUser();

    req.locals = {
        user,
    };

    next();
};

// el middleware que verifica la ip se ejecuta antes
app.get('/test', async (req, res) => {
    const user = req.locals.user;

    res.json({
        status: 'ok',
        user,
    });
});

// el middleware que verifica la ip se ejecuta antes
// leugo se ejecuta el middleware foo
app.get('/test-2', foo, async (req, res) => {
    const user = req.locals.user;

    res.json({
        status: 'ok',
        user,
    });
});

app.listen(5000, () => console.log('API ready port: 5000...'));

