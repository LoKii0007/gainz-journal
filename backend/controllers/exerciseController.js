const prisma = require("../utils/prisma");


// @desc    Get all exercises for a workout
// @route   GET /api/exercise?workoutId=:workoutId
// @access  Private
const getExercises = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        id: req.params.id,
        workout:{
          profile:{
            userId: req.user.id
          }
        }
      },
      include: {
        sets: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    res.json({ exercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get exercise by id
// @route   GET /api/exercise/:id
// @access  Private
const getExerciseById = async (req, res) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        sets: true,
        workout: {
          include: {
            profile: true
          }
        }
      }
    });

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Check if exercise belongs to user
    if (exercise.workout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create an exercise
// @route   POST /api/exercise
// @access  Private
const createExercise = async (req, res) => {
  try {
    const { name, workoutId, sets = [] } = req.body;

    if (!name || !workoutId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        workoutId,
        sets: {
          createMany: {
            data: sets.map(set => ({
              reps: set.reps,
              weight: set.weight
            }))
          }
        }
      },
      include: {
        sets: true
      }
    });

    res.status(201).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an exercise
// @route   PUT /api/exercise/:id
// @access  Private
const updateExercise = async (req, res) => {
  try {
    const { name } = req.body;

    // Find exercise to check ownership
    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        workout: {
          include: {
            profile: true
          }
        }
      }
    });

    if (!existingExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Check if exercise belongs to user
    if (existingExercise.workout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const exercise = await prisma.exercise.update({
      where: {
        id: req.params.id
      },
      data: {
        name: name || existingExercise.name
      },
      include: {
        sets: true
      }
    });

    res.json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an exercise
// @route   DELETE /api/exercise/:id
// @access  Private
const deleteExercise = async (req, res) => {
  try {
    // Find exercise to check ownership
    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        workout: {
          include: {
            profile: true
          }
        }
      }
    });

    if (!existingExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Check if exercise belongs to user
    if (existingExercise.workout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.exercise.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: 'Exercise removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
}; 