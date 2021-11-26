const model = require('../models');
const {Op} = require("sequelize");
const cron = require('node-cron');

const prune = ():void => {
    console.log('Pruninggg....')
    const task = cron.schedule('*/5 * * * *', () => {
        console.log("Task is running every 5 minutes " + new Date())
        model.Lot.destroy({
            where: {valid_till: {[Op.lt]: new Date()}},
            order: [['valid_till']],
        })
    });

    // task.stop();
}

exports = module.exports = prune;