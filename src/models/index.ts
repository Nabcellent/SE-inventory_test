import {Sequelize} from "sequelize";
import * as configFile from '../../config/config'

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// @ts-ignore
const config = configFile[env]
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
    // @ts-ignore
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file: { indexOf: (arg0: string) => number; slice: (arg0: number) => string; }) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: any) => {
        // @ts-ignore
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        // @ts-ignore
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    // @ts-ignore
    if (db[modelName].associate) {
        // @ts-ignore
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;
