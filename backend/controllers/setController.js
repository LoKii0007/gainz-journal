const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function to check exercise ownership
const checkExerciseOwnership = async (exerciseId, userId) => {
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId
    },
    include: {
      workout: {
        include: {
          profile: true
        }
      }
    }
  });

  if (!exercise) {
    return { error: 'Exercise not found', status: 404 };
  }

  if (exercise.workout.profile.userId !== userId) {
    return { error: 'Not authorized', status: 401 };
  }

  return { exercise };
};

// Helper function to check set ownership
const checkSetOwnership = async (setId, userId) => {
  const set = await prisma.set.findUnique({
    where: {
      id: setId
    },
    include: {
      exercise: {
        include: {
          workout: {
            include: {
              profile: true
            }
          }
        }
      }
    }
  });

  if (!set) {
    return { error: 'Set not found', status: 404 };
  }

  if (set.exercise.workout.profile.userId !== userId) {
    return { error: 'Not authorized', status: 401 };
  }

  return { set };
};


const getSets = async (req, res) => {
  try {
    const { exerciseId } = req.query;

    if (!exerciseId) {
      return res.status(400).json({ message: 'Exercise ID is required' });
    }

    const ownershipCheck = await checkExerciseOwnership(exerciseId, req.user.id);
    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ message: ownershipCheck.error });
    }

    const sets = await prisma.set.findMany({
      where: {
        exerciseId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json({ sets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a set
// @route   POST /api/set
// @access  Private
const createSet = async (req, res) => {
  try {
    const { reps, weight, exerciseId } = req.body;

    if (!reps || !weight || !exerciseId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const ownershipCheck = await checkExerciseOwnership(exerciseId, req.user.id);
    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ message: ownershipCheck.error });
    }

    const set = await prisma.set.create({
      data: {
        reps: parseInt(reps),
        weight: parseFloat(weight),
        exerciseId
      }
    });

    res.status(201).json({ set });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a set
// @route   PUT /api/set/:id
// @access  Private
const updateSet = async (req, res) => {
  try {
    const { reps, weight } = req.body;

    const ownershipCheck = await checkSetOwnership(req.params.id, req.user.id);
    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ message: ownershipCheck.error });
    }

    const { set: existingSet } = ownershipCheck;

    const set = await prisma.set.update({
      where: {
        id: req.params.id
      },
      data: {
        reps: reps !== undefined ? parseInt(reps) : existingSet.reps,
        weight: weight !== undefined ? parseFloat(weight) : existingSet.weight
      }
    });

    res.json({ set });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a set
// @route   DELETE /api/set/:id
// @access  Private
const deleteSet = async (req, res) => {
  try {
    const ownershipCheck = await checkSetOwnership(req.params.id, req.user.id);
    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ message: ownershipCheck.error });
    }

    await prisma.set.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({ message: 'Set removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getSets,
  createSet,
  updateSet,
  deleteSet
}; 