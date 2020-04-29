const fs = require('fs');
const { resolve } = require('path');
const Sequelize = require('sequelize');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize('dbname', 'root', 'root', {
            host: 'localhost',
            dialect: 'postgres'
        });

        const models = {};

        function getModels() {
            fs.readdir('./database/models', (err, file) => {
                file.forEach(file => {
                    const [modelName] = file.split('.');

                    models[modelName] = client.import(resolve(`./database/models/${modelName}`));
                });
            });
        }

        return {
            setModels: () => getModels(),
            getModel: modelName => models[modelName]
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
