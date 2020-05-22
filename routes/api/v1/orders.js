const express = require('express');
const router = express.Router();
console.log("inside controller of Order")
const orderController = require('../../../controllers/orderController');

//connecting to respective controller files
router.post('/create',orderController.addOrder);
router.post('/:id/update_quantity',orderController.updateOrder);        //no upsert feature is added so using POST and not PUT
router.get('/',orderController.getOrder);
router.get('/:id',orderController.getSpecificOrder);
router.delete('/:id',orderController.deleteOrder);

//exporting router module for use
module.exports = router;