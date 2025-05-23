const prisma = require("../utils/prisma");
const { validateSet } = require("../validators/setValidator");

// @desc    Get all sets for an exercise
// @route   GET /api/set
// @access  Private
const getSets = async (req, res) => {
  try {
    const { exerciseId } = req.query;

    if (!exerciseId) {
      return res.status(400).json({ error: "Exercise ID is required" });
    }

    const sets = await prisma.set.findMany({
      where: {
        exerciseId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(sets);
  } catch (error) {
    console.error("Error getting sets:", error);
    res.status(500).json({ error: "Failed to get sets" });
  }
};

// @desc    Create a new set
// @route   POST /api/set
// @access  Private
const createSet = async (req, res) => {
  try {
    const { reps, weight, exerciseId, unit, weightType } = req.body;

    // Validate input
    const validationError = validateSet(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check if exercise exists
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // Create set
    const set = await prisma.set.create({
      data: {
        reps,
        weight,
        unit,
        weightType,
        exerciseId,
      },
    });

    res.status(201).json({ set });
  } catch (error) {
    console.error("Error creating set:", error);
    res.status(500).json({ error: "Failed to create set" });
  }
};

// @desc    Update a set
// @route   PUT /api/set/:id
// @access  Private
const updateSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { reps, weight, unit, weightType } = req.body;

    // Validate input
    const validationError = validateSet(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check if set exists
    const existingSet = await prisma.set.findUnique({
      where: { id },
      include: { exercise: true },
    });

    if (!existingSet) {
      return res.status(404).json({ error: "Set not found" });
    }

    // Update set
    const set = await prisma.set.update({
      where: { id },
      data: {
        reps,
        weight,
        unit,
        weightType,
      },
    });

    res.json({ set });
  } catch (error) {
    console.error("Error updating set:", error);
    res.status(500).json({ error: "Failed to update set" });
  }
};

// @desc    Delete a set
// @route   DELETE /api/set/:id
// @access  Private
const deleteSet = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if set exists
    const existingSet = await prisma.set.findUnique({
      where: { id },
      include: { exercise: true },
    });

    if (!existingSet) {
      return res.status(404).json({ error: "Set not found" });
    }

    // Delete set
    await prisma.set.delete({
      where: { id },
    });

    res.json({ message: "Set deleted successfully" });
  } catch (error) {
    console.error("Error deleting set:", error);
    res.status(500).json({ error: "Failed to delete set" });
  }
};

module.exports = {
  getSets,
  createSet,
  updateSet,
  deleteSet,
}; 