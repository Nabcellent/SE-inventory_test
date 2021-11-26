import express, {Request,Response} from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelopes!');
});

module.exports = router;
