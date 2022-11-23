const express = require('express');
const orderController = require('../controllers/orderController');
const orderAuthMiddleware = require('../middlewares/orderAuthMiddleware');
const validation = require('../utils/validation');
const router = express.Router();

router
  .route('/')
  .get(validation.verifyAdmin, orderController.getAllOrders)
  .post(validation.verifyAdmin, orderAuthMiddleware.checkBody, orderController.postOrder);
router
  .route('/:id')
  .get(validation.verifyAdmin, orderAuthMiddleware.checkOrderExistence, orderController.getOrder)
  .patch(
    validation.verifyAdmin,
    orderAuthMiddleware.checkOrderExistence,
    orderAuthMiddleware.checkBody,
    orderController.patchOrder
  )
  .delete(validation.verifyAdmin, orderAuthMiddleware.checkOrderExistence, orderController.deleteOrder);
router.route('/user/:id').get(validation.verifyUser, orderController.getUserOrders);

module.exports = router;
