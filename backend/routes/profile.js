const express = require('express');
const { 
  getProfiles, 
  getProfileById, 
  createProfile, 
  updateProfile, 
  deleteProfile 
} = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getProfiles)
  .post(createProfile);

router.route('/:id')
  .get(getProfileById)
  .put(updateProfile)
  .delete(deleteProfile);

module.exports = router; 