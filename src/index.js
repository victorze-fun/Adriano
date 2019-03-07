const express = require('express');

const validations = require('./validations');

const app = express();

app.use(express.json());

app.post('/users', validations.validate(validations.createUsersValidation),
        (req, res) => {
    res.json({
        status: 'ok',
    });
});

app.listen(5000, () => console.log('API ready port: 5000...'));

