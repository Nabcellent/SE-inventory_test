import {Request, Response} from "express";
import * as model from '../../models';
import {
    Model,
    Op
} from "sequelize";

// @ts-ignore
const Lot = model.Lot;

/**=========================================================    ADD NEW LOT
 * */
const newLot = (req:Request, res:Response) => {
    let {expiry, quantity} = req.body;

    const data = {
        name: req.params.item,
        valid_till: new Date(parseInt(expiry, 10)),
        quantity: parseInt(quantity, 10)
    }

    Lot.create(data).then((result:Model) => res.status(200).send(result)).catch((error: string) => {
        res.status(500).send("An error occurred: " + error);
    });
}

/**=========================================================    SELL LOT
 * */
const sellLot = (req:Request, res:Response) => {
    let quantity:number = parseInt(req.body.quantity),
        name:string = req.params.item

    // @ts-ignore
    Lot.findAll({
        where: {name, valid_till: {[Op.gt]: new Date()}},
        order: [['valid_till']],
    }).then(async (results:any) => {
        if (results) {
            let totalLotQuantity = await Lot.sum('quantity', {where: {name, valid_till: {[Op.gt]: new Date()}}});

            if (quantity <= totalLotQuantity) {
                for (const result of results) {
                    if (quantity >= result.quantity) {
                        quantity -= result.quantity;
                        result.set({quantity: 0}).save()
                    } else if(quantity > 0) {
                        quantity = result.quantity -= quantity
                        result.set({quantity}).save()

                        break;
                    } else {
                        break;
                    }
                }

                return res.status(200).send({status: 'Sold'});
            } else {
                return res.status(200).send("Available quantity is insufficient.");
            }
        }

        res.status(201).send({quantity: 0, valid_till: null});
    }).catch((error: string) => res.status(500).send("An error occurred: " + error))
}

/**=========================================================    GET LOT QUANTITY
 * */
const getQuantity = (req:Request, res:Response) => {
    let name = req.params.item;

    Lot.findOne({
        attributes: ['quantity', 'valid_till'],
        order: [['valid_till']],
        where: {name, valid_till: {[Op.gt]: new Date()}},
    }).then(async (result: { quantity: any; valid_till: null; }) => {
        if (result) {
            result.quantity = await Lot.sum('quantity', {where: {name, valid_till: {[Op.gt]: new Date()}}});

            if(!result.quantity) result.valid_till = null

            return res.status(200).send(result);
        }

        res.status(201).send({quantity: 0, valid_till: null});
    }).catch((error: string) => res.status(500).send("An error occurred: " + error))
}

export { newLot, sellLot, getQuantity };