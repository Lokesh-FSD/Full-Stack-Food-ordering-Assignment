const express = require('express');
const fs = require('fs')
const router = express.Router();
const FoodItemsModal = require('../models/foodItem')

// Getting the Directory to read the data
const path = `${__dirname}/data`;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Data secondary Path');
});

//Post Method to add cart items
router.post('/add', function (req, res) {
    console.log(req.body);
    const FoodItem = new FoodItemsModal(req.body);
    FoodItem.save(function (err) {
        if (err) {
            res.status(400).send({ "message": err })
        }
        else {
            res.status(200).send("Food item added Successfully")
        }
    })
})

// Get Methond to Get the Data
router.get("/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    fs.readFile(`${path}/data.json`, function (err, data) {
        if (err) {
            return res.send("Error", err)
        }
        else {
            const subItems = JSON.parse(data)
            const userData = subItems.results.filter(item => item.id == id)
            res.send({ result: userData });
        }
    })
})


module.exports = router;
