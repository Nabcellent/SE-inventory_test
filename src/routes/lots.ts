import express, {Request,Response} from 'express';
import * as LotController from '../controllers/LotController'

const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
    res.send("lots");
})
router.post('/:item/add', LotController.newLot)
router.post('/:item/sell', LotController.sellLot)
router.get('/:item/quantity', LotController.getQuantity)

module.exports = router;
