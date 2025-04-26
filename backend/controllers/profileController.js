const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// @desc    Get all profiles for current user
// @route   GET /api/profile
// @access  Private
const getProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: req.user.id
      }
    });

    res.json({ profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get profile by id
// @route   GET /api/profile/:id
// @access  Private
const getProfileById = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if profile belongs to user
    if (profile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const workouts = await prisma.workout.findMany({
      where: {
        profileId: req.params.id
      },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    });

    res.json({ profile, workouts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a profile
// @route   POST /api/profile
// @access  Private
const createProfile = async (req, res) => {
  try {
    const { name, age, gender, fitnessLevel, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a name for the profile' });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        age: age ? parseInt(age) : null,
        gender,
        fitnessLevel,
        imageUrl,
        userId: req.user.id
      }
    });

    res.status(201).json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a profile
// @route   PUT /api/profile/:id
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, age, gender, fitnessLevel, imageUrl } = req.body;

    // Find profile to check ownership
    const existingProfile = await prisma.profile.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if profile belongs to user
    if (existingProfile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const profile = await prisma.profile.update({
      where: {
        id: req.params.id
      },
      data: {
        name: name || existingProfile.name,
        age: age ? parseInt(age) : existingProfile.age,
        gender: gender || existingProfile.gender,
        fitnessLevel: fitnessLevel || existingProfile.fitnessLevel,
        imageUrl: imageUrl || existingProfile.imageUrl
      }
    });

    res.json({ profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a profile
// @route   DELETE /api/profile/:id
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    // Find profile to check ownership
    const existingProfile = await prisma.profile.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if profile belongs to user
    if (existingProfile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.profile.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: 'Profile removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
}; 