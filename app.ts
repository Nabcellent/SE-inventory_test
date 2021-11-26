import express, {Application} from 'express';

const indexRouter = require('./src/routes/index');
const lotsRouter = require('./src/routes/lots');

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/lots', lotsRouter);

const PORT = process.env.PORT || 8000;

// @ts-ignore
app.listen(PORT, (err):void => {
    if (err) return console.error(err);

    return console.log(`server is listening on ${PORT}`);
});

require('./src/jobs')()