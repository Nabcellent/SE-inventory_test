'use strict';
module.exports = {
    up: async ({createTable}: any, Sequelize: { INTEGER: any; STRING: any; DATE: any; }) => {
        await createTable('lots', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            valid_till: {
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        }, {
            underscored: true,
            timestamps: true,
            paranoid: true
        });
    },
    down: async (queryInterface: { dropTable: (arg0: string) => void; }) => {
        await queryInterface.dropTable('lots');
    }
};