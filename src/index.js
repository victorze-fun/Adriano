const express = require('express');

// para parsear los cookies que el cliente envía (req.headers.cookie)
// se parse en el objeto req.cookies
const cookieParser = require('cookie-parser');

const app = express();

// ## Registro de middleware ##
// Parsear el body que el cliente envía (post) en formato json.
app.use(express.urlencoded());
app.use(express.json());

app.use(cookieParser());


// Petición Postman
// Método: POST
// URL: http://localhost:5000/users/123?test=2
// Headers: Content-Type: application/json
// Body-raw: { "name": "Victor", "age": 200 }
// Cookies: Domain -> localhost. foo=value1; bar=value2
app.post('/users/:userId', (req, res) => {
    const { userId } = req.params || {};
    const { test } = req.query || {};
    const { name, age } = req.body || {};

    const contentType = req.headers['content-type'];

    console.log(req.headers);
    console.log(req.cookies);
    console.log(req.ip);

    res.json({
        id: userId,
        name,
        age,
        test,
        contentType,
    });
});

app.listen(5000, () => console.log('API ready port: 5000...'));

