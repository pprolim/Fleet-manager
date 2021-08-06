'use strict';

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

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
    const vehicles = db.collection('Vehicles').find();
    var response = [];

    while (await vehicles.hasNext()) {
      response.push(await vehicles.next())
    }

    return res.send(await response);
  } catch (err) {
    return res.status(400).send({ error: 'Error to get vehicles list' });
  }
})

router.get('/chassisId/:chassisId', async (req, res) => {
  try {
    const vehicles = db.collection('Vehicles').find({chassisId: mongoose.Types.ObjectId(req.params.chassisId)});

    return res.send(await vehicles.next());
  } catch (err) {
    return res.status(400).send({ error: 'Error to find a vehicle with this chassisId' });
  }
})


router.post('/type/:type/color/:color/chassis/:chassis', async (req, res) => {
  try {
    switch (req.params.type) {
      case 'Car':
        var passengers = 4
        break;

      case 'Bus':
        var passengers = 42
        break;

      case 'Truck':
        var passengers = 1
        break;

      default:
        break;
    }

    const response = db.collection('Vehicles').insertOne({
      chassisId: mongoose.Types.ObjectId(req.params.chassis),
      type: req.params.type,
      passengers: passengers,
      color: req.params.color
    });

    return res.send(response.insertedId);
  } catch (err) {
    return res.status(400).send({ error: 'Error to save vehicle' });
  }
})

router.put('/chassisId/:chassisId/color/:color', async (req, res) => {
  try {
    const vehicles = db.collection('Vehicles').find({chassisId: mongoose.Types.ObjectId(req.params.chassisId)});

    const vehicle = await vehicles.next();

    const response = db.collection('Vehicles').updateOne(
      {_id: mongoose.Types.ObjectId(vehicle._id)},
      {$set: {color: req.params.color}});

    return res.send(response.insertedId);
  } catch (err) {
    return res.status(400).send({ error: 'Error to update vehicle' });
  }
})

router.delete('/chassisId/:chassisId', async (req, res) => {
  try {
    const vehicles = db.collection('Vehicles').find({chassisId: mongoose.Types.ObjectId(req.params.chassisId)});

    const vehicle = await vehicles.next();

    const response = db.collection('Vehicles').deleteOne(
      {_id: mongoose.Types.ObjectId(vehicle._id)});

    return res.send(response.insertedId);
  } catch (err) {
    return res.status(400).send({ error: 'Error to update vehicle' });
  }
})

module.exports = router;
