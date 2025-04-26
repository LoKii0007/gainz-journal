const express = require('express');
const { 
  getWorkouts, 
  getWorkoutById, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout 
} = require('../controllers/workoutController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

router.route('/:id')
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

module.exports = router; 