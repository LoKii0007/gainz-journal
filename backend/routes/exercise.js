const express = require('express');
const { 
  getExercises, 
  getExerciseById, 
  createExercise, 
  updateExercise, 
  deleteExercise 
} = require('../controllers/exerciseController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getExercises)
  .post(createExercise);

router.route('/:id')
  .get(getExerciseById)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router; 