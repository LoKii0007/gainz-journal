const express = require('express');
const { 
  getSets,
  createSet, 
  updateSet, 
  deleteSet 
} = require('../controllers/setController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getSets)
  .post(createSet);

router.route('/:id')
  .put(updateSet)
  .delete(deleteSet);

module.exports = router; 