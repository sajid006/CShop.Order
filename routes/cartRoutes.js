const express = require('express');
const cartController = require('../controllers/cartController');
const cartAuthMiddleware = require('../middlewares/cartAuthMiddleware');
const validation = require('../utils/validation');
const router = express.Router();

router
  .route('/')
  .get(validation.verifyAdmin, cartController.getAllCarts)
  .post(validation.verifyUser, cartAuthMiddleware.checkPostBody, cartController.postCart);
router
  .route('/:id')
  .get(validation.verifyUser, cartAuthMiddleware.checkCartExistence, cartController.getCart)
  .patch(
    validation.verifyUser,
    cartAuthMiddleware.checkCartExistence,
    cartAuthMiddleware.checkUpdateBody,
    cartController.patchCart
  )
  .delete(validation.verifyUser, cartAuthMiddleware.checkCartExistence, cartController.deleteCart);

module.exports = router;
