const prisma = require("../utils/prisma");

const getWorkouts = async (req, res) => {
  try {
    const { profileId } = req.query;

    if (!profileId) {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    const workouts = await prisma.workout.findMany({
      where: {
        profileId,
        profile: {
          userId: req.user.id,
        },
      },
      include: {
        exercises: {
          include: {
            sets: {
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ workouts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get workout by id
// @route   GET /api/workout/:id
// @access  Private
const getWorkoutById = async (req, res) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        exercises: {
          include: {
            sets: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
        profile: true,
      },
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if profile belongs to user
    if (workout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({ workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a workout
// @route   POST /api/workout
// @access  Private
const createWorkout = async (req, res) => {
  try {
    let { title, day, profileId, exercises = [] } = req.body;

    if (!title || !day) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    let profile;

    // If profileId is provided, verify it
    if (profileId && profileId !== "undefined" && profileId !== null) {
      profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
      });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      if (profile.userId !== req.user.id) {
        return res.status(401).json({ message: "Not authorized" });
      }
    } else {
      // Check if user has any profiles
      const userProfiles = await prisma.profile.findMany({
        where: {
          userId: req.user.id,
          active: true,
        },
      });

      profileId = userProfiles[0].id;
    }

    // Create workout with exercises and sets in a single transaction
    const workout = await prisma.workout.create({
      data: {
        title,
        day,
        profileId,
        exercises: {
          create: exercises.map((exercise) => ({
            name: exercise.name,
          })),
        },
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    res.status(201).json({
      workout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a workout
// @route   PUT /api/workout/:id
// @access  Private
const updateWorkout = async (req, res) => {
  try {
    const { title, day } = req.body;

    // Find workout to check ownership
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        profile: true,
      },
    });

    if (!existingWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if profile belongs to user
    if (existingWorkout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const workout = await prisma.workout.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: title || existingWorkout.title,
        day: day || existingWorkout.day,
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    res.json({ workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workout/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    // Find workout to check ownership
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        profile: true,
      },
    });

    if (!existingWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if profile belongs to user
    if (existingWorkout.profile.userId !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await prisma.workout.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Workout removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
