'use strict';

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const chassisModule = require("../models/chassis");

// ------------------ Mongoo Connection --------------------
const uri = "mongodb+srv://admin:Mx7wmXrLtzZ6jJK@clusterfleet.0y4pg.mongodb.net/FleetManager?retryWrites=true&w=majority";

mongoose.connect(uri, { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting MongoDB'));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//---------------------- Methods ------------------------------------

router.get('/', async (req, res) => {
    try {
        const chassis = db.collection('Chassis').find();
        var result = [];

        while (await chassis.hasNext()) {
            result.push(await chassis.next())
        }

        return res.send(await result);
    } catch (err) {
        return res.status(400).send({ error: 'Error to get chassis list' });
    }
})

router.get('/chassisId/:chassisId', async (req, res) => {
    try {
        const chassis = db.collection('Chassis').find({_id: mongoose.Types.ObjectId(req.params.chassisId)});

        return res.send(await chassis.next());
    } catch (err) {
        return res.status(400).send({ error: 'Error to find chassis with chassisId inserted' });
    }
})

router.post('/series/:serie/number/:number', (req, res) => {
    try {
        console.log(req.params.serie);
        db.collection('Chassis').insertOne({
            series: req.params.serie,
            number: Number(req.params.number)
        }, (err, result) => {
            return res.send(result.insertedId)
        });

    } catch (err) {
        return res.status(400).send({ error: 'Error to save chassis item' });
    }
})

module.exports = router;
