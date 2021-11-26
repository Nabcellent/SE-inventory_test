'use strict';
import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
module.exports = (sequelize:Sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }

    Item.init({
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        valid_till: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Lot',
        // @ts-ignore
        tableName: 'lots',
        underscored: true,
        timestamps: true,
        paranoid: true
    });
    return Item;
};