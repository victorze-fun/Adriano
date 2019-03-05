// el objetivo de este helper es encapsular el manejo de errores
// básicamente es un decorador, para evitar repetir el manejo de errores, en cada handler
function routeHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res);
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
            });
        }
    };
}

function sleep(ms) {
    //return new Promise(resolve => setTimeout(resolve, ms));
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

// simulamos un error
function addUserToDB() {
    return new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Hubo un problema.')), 500));
}

module.exports = {
    routeHelper,
    sleep,
    addUserToDB,
}
