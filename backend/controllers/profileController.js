const prisma = require("../utils/prisma");

// @desc    Get all profiles for a user
// @route   GET /api/profile
// @access  Private
const getProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        workouts: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    res.json(profiles);
  } catch (error) {
    console.error("Error getting profiles:", error);
    res.status(500).json({ error: "Failed to get profiles" });
  }
};

// @desc    Get a profile by ID
// @route   GET /api/profile/:id
// @access  Private
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        workouts: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Check if profile belongs to user
    if (profile.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};

// @desc    Create a new profile
// @route   POST /api/profile
// @access  Private
const createProfile = async (req, res) => {
  try {
    const { name, weightUnit, weightType } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Validate weightUnit
    const validUnits = ["KG", "LBS"];
    if (weightUnit && !validUnits.includes(weightUnit)) {
      return res
        .status(400)
        .json({ error: "Invalid weight unit. Must be either KG or LBS" });
    }

    // Validate weightType
    const validWeightTypes = ["TOTAL", "PER_SIDE"];
    if (weightType && !validWeightTypes.includes(weightType)) {
      return res
        .status(400)
        .json({
          error: "Invalid weight type. Must be either TOTAL or PER_SIDE",
        });
    }

    // Check if user already has an active profile
    const existingActiveProfile = await prisma.profile.findFirst({
      where: {
        userId: req.user.id,
        active: true,
      },
    });

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        name,
        weightUnit: weightUnit || "KG",
        weightType: weightType || "PER_SIDE",
        active: !existingActiveProfile, // Set active to true if no active profile exists
        userId: req.user.id,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

// @desc    Update a profile
// @route   PUT /api/profile/:id
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, active, weightUnit, weightType } = req.body;

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Check if profile belongs to user
    if (existingProfile.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Validate weightUnit
    const validUnits = ["KG", "LBS"];
    if (weightUnit && !validUnits.includes(weightUnit)) {
      return res
        .status(400)
        .json({ error: "Invalid weight unit. Must be either KG or LBS" });
    }

    // Validate weightType
    const validWeightTypes = ["TOTAL", "PER_SIDE"];
    if (weightType && !validWeightTypes.includes(weightType)) {
      return res
        .status(400)
        .json({
          error: "Invalid weight type. Must be either TOTAL or PER_SIDE",
        });
    }

    // If setting this profile as active, deactivate all other profiles
    if (active) {
      await prisma.profile.updateMany({
        where: {
          userId: req.user.id,
          id: { not: id },
        },
        data: {
          active: false,
        },
      });
    }

    // Update profile
    const profile = await prisma.profile.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        active: active !== undefined ? active : undefined,
        weightUnit: weightUnit !== undefined ? weightUnit : undefined,
        weightType: weightType !== undefined ? weightType : undefined,
      },
      include: {
        workouts: {
          include: {
            exercises: {
              include: { sets: true },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.json({ profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// @desc    Delete a profile
// @route   DELETE /api/profile/:id
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Check if profile belongs to user
    if (existingProfile.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Delete profile
    await prisma.profile.delete({
      where: { id },
    });

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: "Failed to delete profile" });
  }
};

module.exports = {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
